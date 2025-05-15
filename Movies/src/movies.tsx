// Stores the currently-being-typechecked object for error messages.
let obj: unknown = null;

export interface MovieData {
  Title: string | number;
  "US Gross"?: number | null;
  "Worldwide Gross"?: number | null;
  "US DVD Sales"?: number | null;
  "Production Budget"?: number | null;
  "Release Date": string;
  "MPAA Rating"?: string | null;
  "Running Time min"?: number | null;
  Distributor?: string | null;
  Source?: string | null;
  "Major Genre"?: string | null;
  "Creative Type"?: string | null;
  Director?: string | null;
  "Rotten Tomatoes Rating"?: number | null;
  "IMDB Rating"?: number | null;
  "IMDB Votes"?: number | null;
  id: number;
}

export class MoviesProxy {
  public readonly Title: string | number;
  public readonly US_Gross: number | null;
  public readonly Worldwide_Gross: number | null;
  public readonly US_DVD_Sales: number | null;
  public readonly Production_Budget: number | null;
  public readonly Release_Date: string;
  public readonly MPAA_Rating: string | null;
  public readonly Running_Time_min: number | null;
  public readonly Distributor: string | null;
  public readonly Source: string | null;
  public readonly Major_Genre: string | null;
  public readonly Creative_Type: string | null;
  public readonly Director: string | null;
  public readonly Rotten_Tomatoes_Rating: number | null;
  public readonly IMDB_Rating: number | null;
  public readonly IMDB_Votes: number | null;
  public readonly id: number;

  public static Parse(d: string): MoviesProxy {
    return MoviesProxy.Create(JSON.parse(d));
  }

  public static Create(d: unknown, field: string = "root"): MoviesProxy {
    if (!field) {
      obj = d;
      field = "root";
    }

    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    }
    if (typeof d !== "object") {
      throwNotObject(field, d, false);
    }
    if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }

    const data = d as Record<string, unknown>;

    // Validate Title (string or number)
    if (data.Title === undefined) {
      data.Title = null;
    } else if (
      typeof data.Title !== "string" &&
      typeof data.Title !== "number"
    ) {
      throwTypeError(field + ".Title", data.Title, "string or number", true);
    }

    // Validate nullable number fields
    checkNumber(data["US Gross"], true, field + ".US Gross");
    data["US Gross"] = data["US Gross"] ?? null;

    checkNumber(data["Worldwide Gross"], true, field + ".Worldwide Gross");
    data["Worldwide Gross"] = data["Worldwide Gross"] ?? null;

    checkNumber(data["US DVD Sales"], true, field + ".US DVD Sales");
    data["US DVD Sales"] = data["US DVD Sales"] ?? null;

    checkNumber(data["Production Budget"], true, field + ".Production Budget");
    data["Production Budget"] = data["Production Budget"] ?? null;

    // Validate Release Date (non-nullable string)
    checkString(data["Release Date"], false, field + ".Release Date");

    // Validate nullable string fields
    checkString(data["MPAA Rating"], true, field + ".MPAA Rating");
    data["MPAA Rating"] = data["MPAA Rating"] ?? null;

    checkNumber(data["Running Time min"], true, field + ".Running Time min");
    data["Running Time min"] = data["Running Time min"] ?? null;

    checkString(data.Distributor, true, field + ".Distributor");
    data.Distributor = data.Distributor ?? null;

    checkString(data.Source, true, field + ".Source");
    data.Source = data.Source ?? null;

    checkString(data["Major Genre"], true, field + ".Major Genre");
    data["Major Genre"] = data["Major Genre"] ?? null;

    checkString(data["Creative Type"], true, field + ".Creative Type");
    data["Creative Type"] = data["Creative Type"] ?? null;

    checkString(data.Director, true, field + ".Director");
    data.Director = data.Director ?? null;

    checkNumber(
      data["Rotten Tomatoes Rating"],
      true,
      field + ".Rotten Tomatoes Rating"
    );
    data["Rotten Tomatoes Rating"] = data["Rotten Tomatoes Rating"] ?? null;

    checkNumber(data["IMDB Rating"], true, field + ".IMDB Rating");
    data["IMDB Rating"] = data["IMDB Rating"] ?? null;

    checkNumber(data["IMDB Votes"], true, field + ".IMDB Votes");
    data["IMDB Votes"] = data["IMDB Votes"] ?? null;

    // Validate id (non-nullable number)
    checkNumber(data.id, false, field + ".id");

    return new MoviesProxy(data as unknown as MovieData);
  }

  private constructor(d: MovieData) {
    this.Title = d.Title;
    this.US_Gross = d["US Gross"] ?? null;
    this.Worldwide_Gross = d["Worldwide Gross"] ?? null;
    this.US_DVD_Sales = d["US DVD Sales"] ?? null;
    this.Production_Budget = d["Production Budget"] ?? null;
    this.Release_Date = d["Release Date"] ?? null;
    this.MPAA_Rating = d["MPAA Rating"] ?? null;
    this.Running_Time_min = d["Running Time min"] ?? null;
    this.Distributor = d.Distributor ?? null;
    this.Source = d.Source ?? null;
    this.Major_Genre = d["Major Genre"] ?? null;
    this.Creative_Type = d["Creative Type"] ?? null;
    this.Director = d.Director ?? null;
    this.Rotten_Tomatoes_Rating = d["Rotten Tomatoes Rating"] ?? null;
    this.IMDB_Rating = d["IMDB Rating"] ?? null;
    this.IMDB_Votes = d["IMDB Votes"] ?? null;
    this.id = d.id;
  }
}

function throwNull2NonNull(field: string, d: unknown): never {
  throwTypeError(field, d, "non-nullable object", false);
}

function throwNotObject(field: string, d: unknown, nullable: boolean): never {
  throwTypeError(field, d, "object", nullable);
}

function throwIsArray(field: string, d: unknown, nullable: boolean): never {
  throwTypeError(field, d, "object", nullable);
}

function checkNumber(d: unknown, nullable: boolean, field: string): void {
  if (typeof d !== "number" && (!nullable || (d !== null && d !== undefined))) {
    throwTypeError(field, d, "number", nullable);
  }
}

function checkString(d: unknown, nullable: boolean, field: string): void {
  if (typeof d !== "string" && (!nullable || (d !== null && d !== undefined))) {
    throwTypeError(field, d, "string", nullable);
  }
}

function throwTypeError(
  field: string,
  d: unknown,
  type: string,
  nullable: boolean
): never {
  let expectedType = type;
  if (nullable) {
    expectedType += ", null, or undefined";
  }
  throw new TypeError(
    `Expected ${expectedType} at ${field} but found:\n${JSON.stringify(
      d
    )}\n\nFull object:\n${JSON.stringify(obj)}`
  );
}
