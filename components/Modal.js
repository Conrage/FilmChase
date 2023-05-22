"use client";
import { Close, Star } from "@material-ui/icons";
import { useState, useEffect } from "react";

export default function Modal(props) {
  const [film, setFilm] = useState({});
  const [provedores, setProvedores] = useState([]);
  const handleVisibilityClick = () => {
    props.onVisibilityClick();
  };
  function getFilm() {
    const url = `https://api.themoviedb.org/3/movie/${props}?language=pt-BR`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUxM2VhMDAxZDUyMTNkYjExMWQ4OTI5M2E0YjIyNCIsInN1YiI6IjY0NWNmZDFlMWI3MGFlMDBmZDZkNWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZUoMEgF3X1GkXtbYo8Y4kxSyQuNYBlL6f28bUM23Rk",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFilm(response);
      })
      .catch((err) => console.error(err));
  }
  function getProviders() {
    const url = `https://api.themoviedb.org/3/movie/${props}/watch/providers`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUxM2VhMDAxZDUyMTNkYjExMWQ4OTI5M2E0YjIyNCIsInN1YiI6IjY0NWNmZDFlMWI3MGFlMDBmZDZkNWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZUoMEgF3X1GkXtbYo8Y4kxSyQuNYBlL6f28bUM23Rk",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setProvedores(response.results.US.buy);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getFilm();
    getProviders();
  }, [props.id]);
  return (
    <div className="font-mont text-white flex fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center">
      <div className="w-[40rem] h-[32rem] rounded-md bg-[#1C1C1C]">
        <div className="flex items-center w-full justify-between p-4">
          <p className="text-xl font-semibold">Detalhes do filme</p>
          <Close onClick={handleVisibilityClick} className="hover:text-red-600 transition-all active:scale-90 cursor-pointer"></Close>
        </div>
        <div className="w-full h-[1px] bg-white"></div>
        <div className="flex p-4 h-[28rem]">
          {film.poster_path ? (
            <img
              className="h-full rounded-md w-40 object-cover"
              src={"https://image.tmdb.org/t/p/w500/" + film.poster_path}
            />
          ) : (
            <img
              className="h-full rounded-md w-40 object-cover"
              src="noPhoto.png"
            />
          )}
          <div className="flex flex-col ml-4">
            <p className="text-base font-semibold">{film.title}</p>
            <p className="mt-2">Descrição</p>
            <div className="flex h-20 border p-2 rounded-md overflow-y-auto w-full">
              <p>{film.overview}</p>
            </div>
            <p className="mt-2">Gêneros</p>
            <div className="flex gap-2 w-[26rem] overflow-x-auto">
              {film.genres?.map((genero) => {
                return (
                  <div className="p-2 border rounded-full w-fit">
                    <p>{genero.name}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2">Onde assistir</p>
            <div className="flex gap-2 w-[26rem] overflow-x-auto">
              {provedores?.map((provedor) => {
                return (
                  <div className="p-2 border rounded-full min-w-fit">
                    <p>{provedor.provider_name}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2">Data de lançamento</p>
            <p>{film.release_date}</p>
            <div className="flex mt-2 gap-2 items-center">
              <Star className="text-[#FFC700]" />
              <span className="text-lg text-[#FFC700]">8.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
