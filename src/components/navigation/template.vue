<template>

  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block"
    data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item px-2"><RouterLink to="/" class="nav-link fw-medium" active-class="active">Home</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/ikigai" class="nav-link fw-medium" active-class="active">Ikigai</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/ippo" class="nav-link fw-medium" active-class="active">Ippo</RouterLink></li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" id="nutritionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Nutrition
            </a>
            <ul class="dropdown-menu" aria-labelledby="nutritionDropdown">
              <li><RouterLink to="/nutrition" class="dropdown-item">Overview</RouterLink></li>
              <li><RouterLink to="/nutrition/ingredients" class="dropdown-item">Ingredients</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" id="literatureDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Literature
            </a>
            <ul class="dropdown-menu" aria-labelledby="literatureDropdown">
              <li><RouterLink to="/literature" class="dropdown-item">Overview</RouterLink></li>
              <li><RouterLink to="/books" class="dropdown-item">Books</RouterLink></li>
              <li><RouterLink to="/poems" class="dropdown-item">Poems</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" id="entertainmentDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Entertainment
            </a>
            <ul class="dropdown-menu" aria-labelledby="entertainmentDropdown">
              <li><RouterLink to="/entertainment" class="dropdown-item">Overview</RouterLink></li>
              <li><RouterLink to="/anime" class="dropdown-item">Anime</RouterLink></li>
              <li><RouterLink to="/movies" class="dropdown-item">Movies</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link dropdown-toggle fw-medium" href="#" id="adventuresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Adventures
            </a>
            <ul class="dropdown-menu" aria-labelledby="adventuresDropdown">
              <li><RouterLink to="/adventures" class="dropdown-item">Overview</RouterLink></li>
              <li><RouterLink to="/adventures/destinations" class="dropdown-item">Destinations</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item px-2"><RouterLink to="/experiments" class="nav-link fw-medium" active-class="active">Experiments</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/random" class="nav-link fw-medium" active-class="active">Random</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>

</template>
