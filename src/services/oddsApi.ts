const API_KEY = "414f1240897ade9f8178b574545826ae";
const BASE_URL = "https://api.the-odds-api.com/v4";

export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface Game {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
}

export const fetchSports = async (): Promise<Sport[]> => {
  try {
    const response = await fetch(`${BASE_URL}/sports?apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch sports");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sports:", error);
    return [];
  }
};

export const fetchUpcomingGames = async (sport: string = "upcoming"): Promise<Game[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      regions: "eu",
      markets: "h2h",
      oddsFormat: "decimal",
    });

    const response = await fetch(`${BASE_URL}/sports/${sport}/odds?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch odds data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching odds:", error);
    return [];
  }
};

export const fetchGamesByDate = async (sport: string, dateFrom: string, dateTo: string): Promise<Game[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      regions: "eu",
      markets: "h2h",
      oddsFormat: "decimal",
      commenceTimeFrom: dateFrom,
      commenceTimeTo: dateTo,
    });

    const response = await fetch(`${BASE_URL}/sports/${sport}/odds?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch odds data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching odds:", error);
    return [];
  }
};
