// Base de données mockée de films
export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  year: number;
  genre: string[];
  director: string;
  cast: string[];
  duration: number; // en minutes
  rating: number; // note sur 10
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate: string;
  language: string;
  budget: number;
  revenue: number;
  userRating?: number; // Note utilisateur
  watchlist: boolean;
  watched: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Le Parrain",
    originalTitle: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drame"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    duration: 175,
    rating: 9.2,
    poster: "https://images.unsplash.com/photo-1489599413714-49309567d1ad?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599413714-49309567d1ad?w=800&h=400&fit=crop",
    overview: "L'histoire de la famille Corleone, une des familles les plus puissantes de la mafia américaine.",
    releaseDate: "1972-03-24",
    language: "Anglais",
    budget: 6000000,
    revenue: 246120974,
    watchlist: false,
    watched: false
  },
  {
    id: 2,
    title: "Pulp Fiction",
    originalTitle: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drame"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    duration: 154,
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
    overview: "Les vies de deux tueurs à gages, d'un boxeur et d'un couple de braqueurs s'entremêlent dans quatre histoires.",
    releaseDate: "1994-10-14",
    language: "Anglais",
    budget: 8000000,
    revenue: 214179088,
    watchlist: false,
    watched: false
  },
  {
    id: 3,
    title: "Inception",
    originalTitle: "Inception",
    year: 2010,
    genre: ["Science-Fiction", "Action", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    duration: 148,
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=400&fit=crop",
    overview: "Dom Cobb est un voleur expérimenté dans l'art de s'approprier les secrets du subconscient.",
    releaseDate: "2010-07-16",
    language: "Anglais",
    budget: 160000000,
    revenue: 836836967,
    watchlist: false,
    watched: false
  },
  {
    id: 4,
    title: "Interstellar",
    originalTitle: "Interstellar",
    year: 2014,
    genre: ["Science-Fiction", "Drame", "Aventure"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    duration: 169,
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
    overview: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace pour sauver l'humanité.",
    releaseDate: "2014-11-07",
    language: "Anglais",
    budget: 165000000,
    revenue: 677471339,
    watchlist: false,
    watched: false
  },
  {
    id: 5,
    title: "La La Land",
    originalTitle: "La La Land",
    year: 2016,
    genre: ["Romance", "Drame", "Comédie musicale"],
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    duration: 128,
    rating: 8.0,
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    overview: "Un pianiste de jazz et une actrice en herbe tombent amoureux à Los Angeles.",
    releaseDate: "2016-12-09",
    language: "Anglais",
    budget: 30000000,
    revenue: 448966908,
    watchlist: false,
    watched: false
  },
  {
    id: 6,
    title: "Joker",
    originalTitle: "Joker",
    year: 2019,
    genre: ["Thriller", "Crime", "Drame"],
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    duration: 122,
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    overview: "L'histoire d'Arthur Fleck, un homme ignoré par la société qui devient le Joker.",
    releaseDate: "2019-10-04",
    language: "Anglais",
    budget: 55000000,
    revenue: 1074251311,
    watchlist: false,
    watched: false
  },
  {
    id: 7,
    title: "Parasite",
    originalTitle: "기생충",
    year: 2019,
    genre: ["Thriller", "Drame", "Comédie"],
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    duration: 132,
    rating: 8.5,
    poster: "https://images.unsplash.com/photo-1594736797933-d0d9eb7ad942?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1594736797933-d0d9eb7ad942?w=800&h=400&fit=crop",
    overview: "Une famille pauvre s'infiltre dans la maison d'une famille riche avec des conséquences inattendues.",
    releaseDate: "2019-05-30",
    language: "Coréen",
    budget: 11400000,
    revenue: 258803606,
    watchlist: false,
    watched: false
  },
  {
    id: 8,
    title: "Avengers: Endgame",
    originalTitle: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Aventure", "Science-Fiction"],
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    duration: 181,
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&h=400&fit=crop",
    overview: "Les Avengers doivent tout sacrifier pour défaire les actions de Thanos.",
    releaseDate: "2019-04-26",
    language: "Anglais",
    budget: 356000000,
    revenue: 2797800564,
    watchlist: false,
    watched: false
  }
];

export const genres = [
  "Action",
  "Aventure",
  "Animation",
  "Comédie",
  "Comédie musicale",
  "Crime",
  "Documentaire",
  "Drame",
  "Familial",
  "Fantasy",
  "Horreur",
  "Mystère",
  "Romance",
  "Science-Fiction",
  "Thriller",
  "Guerre",
  "Western"
];