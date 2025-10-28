import { Grid } from "@mui/material";
import Container from "../../components/Container";
import styles from "./index.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { endpoints } from "../../config/constants";
import { getAll } from "../../services/api/api";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAll(endpoints.movies).then((response) => {
      setMovies([...response.data]);
    });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <section className={styles["home-section"]}>
          <Container>
            <div className={styles["home-header"]}>
              <h1>Welcome To MovieMania</h1>
              <p>Experience the Magic of Movies with MovieMania</p>
            </div>
          </Container>
        </section>
        <section className={styles["slider-section"]}>
          <Container>
            <h1>Featured Movies</h1>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className={styles["swiper-container"]}
            >
              {movies.map((movie) => (
                <SwiperSlide
                  key={movie.id}
                  className={styles["slider-content"]}
                >
                  <Card sx={{ width: "100%", backgroundColor: "#F5F5F1" }}>
                    <CardMedia
                      sx={{
                        height: 350,
                        objectFit: "cover",
                      }}
                      image={movie.coverImg}
                      title={movie.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Genre: {movie.genre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year: {movie.year}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Artist: {movie.artist}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="error" size="small">
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/movies`}
                        >
                          All Movies
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
      </HelmetProvider>
    </>
  );
}

export default Home;
