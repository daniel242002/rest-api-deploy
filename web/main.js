fetch("http://localhost:3000/movies")
  .then((res) => res.json())
  .then((movies) => {
    const html = movies
      .map((movie) => {
        return `<article data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" alt="${movie.title}">
                    <p>${movie.year}</p>
                    </article>`;
      })
      .join("");

    document.querySelector("main").innerHTML = html;
  });
