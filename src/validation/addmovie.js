import * as Yup from "yup";

export const MovieValidationSchema = Yup.object().shape({
    title: Yup.string().min(3).required(),
    artist: Yup.string().min(2).max(25).required(),
    year: Yup.number().min(1900).required(),
    genre: Yup.string()
    .oneOf(["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Historical", "Crime", "Science Fiction", "Horror" , "Thriller"])
    .required(),
    coverImg: Yup.string().url().required()
})