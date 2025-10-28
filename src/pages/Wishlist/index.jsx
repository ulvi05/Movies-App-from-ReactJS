import React from "react";
import { useWishlist } from "../../services/context/wishlistContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import Container from "../../components/Container";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Container>
        <Box sx={{ mt: 12, mb: 4 }}>
          <Typography variant="h4" fontWeight={600} textAlign="center">
            My Wishlist ❤️
          </Typography>
        </Box>

        {wishlist.length === 0 ? (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            Wishlist is empty… 💔 Like some movies.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 4, mb: 10 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Movie</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Artist</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlist.map((fav) => (
                  <TableRow
                    key={fav.id}
                    sx={{
                      "&:hover": { backgroundColor: "#fafafa" },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <img
                          src={fav.coverImg}
                          alt={fav.title}
                          style={{
                            width: "50px",
                            height: "70px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                        <Typography>{fav.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{fav.year}</TableCell>
                    <TableCell>{fav.genre}</TableCell>
                    <TableCell>{fav.artist}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </HelmetProvider>
  );
};

export default Wishlist;
