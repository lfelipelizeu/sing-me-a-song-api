import joi from 'joi';

function newSongValidationError(body) {
    const songSchema = joi.object({
        name: joi.string().trim().min(1).max(100)
            .required(),
        youtubeLink: joi.string().regex(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/).required(),
    });

    const { error } = songSchema.validate(body);

    return error;
}

export {
    newSongValidationError,
};
