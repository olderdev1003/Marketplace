/*
 * Prepares CDN image URL with appropriate filters
 * relying on AWS image handler (v4) that leverages sharp
 * https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/deployment.html
*/

/**
 * Class allowing to build CDN image URLs with sharp edit operations,
 * such as resizing or WebP compression.
 */
export class CdnImage {
  /**
   * Instantiates class with CDN parameters.
   * @param {String} base - base URL of CDN handling images, such as https://cdn.stelace.com
   * @param {String} bucket - plain S3 bucket name such as 'my-files'
   * @param {String} [isServedFromCdn] - This function lets you check that a file URI
   *   is served from CDN before trying to apply image edits.
   *   If this function taking `uri`, `base` and internal `s3BucketUrl` as parameters returns a falsy value,
   *   `getUrl(uri, edits)` method will simply return uri and ignore edits.
   *   Defaults to `(uri, base, bucketUrl) => uri.startsWith(base) || uri.startsWith(bucketUrl)`
   */
  constructor ({ base, bucket, isServedFromCdn } = {}) {
    this.base = base
    this.bucket = bucket
    this.s3BucketUrl = `https://${this.bucket}.s3.amazonaws.com`
    this.isServedFromCdn = (uri, base = this.base, bucketUrl = this.s3BucketUrl) => {
      return typeof isServedFromCdn === 'function'
        ? isServedFromCdn(uri, base, bucketUrl)
        : (typeof uri === 'string' && (uri.startsWith(base) || uri.startsWith(bucketUrl)))
    }
  }

  /**
   * Turn CDN file URI into image URL with edit operations.
   * If `uri` is a full URL and the file is not served from CDN, `uri` is return unchanged.
   * @param {String} uri - File `uri` can be an URL including host and protocol.
   * @param {Object} [edits] - only used if image is served from CDN with image handler.
   *    This object can include any sharp transform, like `edits: { webp: true }`.
   * @param {String} [options.bucket] - overriding default bucket
   */
  getUrl (uri, edits = {}, options = {}) {
    let path

    try {
      const url = new URL(uri)
      path = url.pathname
      if (!this.isServedFromCdn(uri)) return uri
    } catch (e) {
      if (/valid URL/i.test(e.message)) path = uri // filename URI is an invalid URL
      else return uri
    }

    try {
      const imageRequest = JSON.stringify({
        bucket: options.bucket || this.bucket,
        // URL class automatically encodes path, which we don’t want in this object
        // So we can match key in AWS image handler
        key: decodeURIComponent(path.replace(/^\//, '')),
        edits
      })

      return `${
        this.base.replace(/\/$/, '') || ''
      }/${
        btoa(imageRequest)
      }`
    } catch (e) {
      return uri
    }
  }
}
