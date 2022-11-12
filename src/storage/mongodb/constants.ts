import { SchemaOptions } from '@nestjs/mongoose';

export const SchemaConstants: SchemaOptions = {
    timestamps: true,
    toJSON: {
        versionKey: false,
        transform: function (doc, ret) {
            ret._id = ret._id.toString();
            // delete ret.updatedAt;
        },
    },
};

export const SchemaConstantsWithTransform = (
    transform: (ret: any) => void,
): SchemaOptions => {
    return {
        timestamps: true,
        toJSON: {
            versionKey: false,
            transform: function (doc, ret) {
                transform(ret);
                // delete ret._id;
            },
        },
    };
};
