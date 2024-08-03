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
} from "@mui/material";
import Container from "../../components/Container";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container>
        <TableContainer
          sx={{ marginTop: 20, marginBottom: 20 }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">Artist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist.map((fav) => (
                <TableRow
                  key={fav.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {fav.id}
                  </TableCell>
                  <TableCell align="right">{fav.title}</TableCell>
                  <TableCell align="right">{fav.year}</TableCell>
                  <TableCell align="right">{fav.genre}</TableCell>
                  <TableCell align="right">{fav.artist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </HelmetProvider>
  );
};

export default Wishlist;
