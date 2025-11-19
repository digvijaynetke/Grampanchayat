const mongodb = require('mongodb');
const { ObjectId } = mongodb;

/**
 * Upload image to GridFS
 * @param {Object} file - Multer file object
 * @param {Object} metadata - Image metadata
 * @param {Object} db - Database instance
 * @param {Object} gridFSBucket - GridFS bucket instance
 */
const uploadImage = async (file, metadata, db, gridFSBucket) => {
  try {
    // Create upload stream
    const uploadStream = gridFSBucket.openUploadStream(file.originalname, {
      metadata: metadata
    });
    
    // Write file buffer to stream
    uploadStream.end(file.buffer);
    
    return new Promise((resolve, reject) => {
      uploadStream.on('finish', async () => {
        // Save metadata to images collection
        const imagesCollection = db.collection('images');
        const imageDoc = {
          gridfsId: uploadStream.id,
          component: metadata.component,
          category: metadata.category || null,
          altText: metadata.altText || '',
          order: metadata.order || 0,
          uploadedAt: new Date(),
          filename: file.originalname,
          contentType: file.mimetype,
          size: file.size
        };
        
        const result = await imagesCollection.insertOne(imageDoc);
        resolve({
          imageId: result.insertedId,
          gridfsId: uploadStream.id
        });
      });
      
      uploadStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Get image stream from GridFS
 * @param {ObjectId} gridfsId - GridFS file ID
 * @param {Object} gridFSBucket - GridFS bucket instance
 */
const getImageStream = (gridfsId, gridFSBucket) => {
  try {
    return gridFSBucket.openDownloadStream(new ObjectId(gridfsId));
  } catch (error) {
    throw error;
  }
};

/**
 * Delete image from GridFS
 * @param {ObjectId} gridfsId - GridFS file ID
 * @param {Object} gridFSBucket - GridFS bucket instance
 */
const deleteImage = async (gridfsId, gridFSBucket) => {
  try {
    await gridFSBucket.delete(new ObjectId(gridfsId));
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Get image metadata
 */
const getImageMetadata = async (imageId) => {
  try {
    const db = getDB();
    const imagesCollection = db.collection('images');
    const image = await imagesCollection.findOne({ _id: new ObjectId(imageId) });
    return image;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadImage,
  getImageStream,
  deleteImage,
  getImageMetadata
};

