
function Validate(schema, property, abort) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false, allow: true });
        if(error) {
            next(error);
            return;
        }
        next();
    }
}

module.exports = Validate;