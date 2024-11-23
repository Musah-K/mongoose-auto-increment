module.exports = function autoIncrementField(schema, options) {
    const fieldName = options && options.fieldName ? options.fieldName : 'index';
  
    const fieldConfig = {};
    fieldConfig[fieldName] = { type: Number, unique: true, required: true };
    schema.add(fieldConfig);
  
    schema.pre("validate", async function (next) {
        
      if (this.isNew && !this[fieldName]) {
        try {
          const lastDoc = await this.constructor.findOne().sort({ [fieldName]: -1 }).exec();


          this[fieldName] = lastDoc ? lastDoc[fieldName] + 1 : 1;
        } catch (error) {

          return next(error);
        }
      }

      next();
    });
  };
  