import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { APIResponse, Error } from "@/app/api/types/response";
import { BASE_HN_URL } from "@/app/api/constatnts";

const supportedStoryTypes: string[] = [
  "best",
  "top",
  "ask",
  "show",
  "job",
  "new",
];

type StoryType = "best" | "top" | "ask" | "show" | "job" | "new";

function getHNApiByType(type: StoryType): string {
  let apiIdentifier: string;

  switch (type) {
    case "best":
      apiIdentifier = "beststories.json";
      break;

    case "top":
      apiIdentifier = "topstories.json";
      break;

    case "new":
      apiIdentifier = "newstories.json";
      break;

    case "ask":
      apiIdentifier = "askstories.json";
      break;
    case "show":
      apiIdentifier = "showstories.json";
      break;
    case "job":
      apiIdentifier = "jobstories.json";
      break;
    default:
      apiIdentifier = "topstories.json";
      break;
  }
  return BASE_HN_URL + apiIdentifier;
}

/**
 * Endpoint: /api/stories?type=<"best"|"top"|"ask"|"show"|"job">
 * @param request
 * @returns
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<APIResponse>> {
  let response: APIResponse;
  const params = request.nextUrl.searchParams;
  const type: StoryType = params.get("type") as StoryType;

  if (type && supportedStoryTypes.includes(type)) {
    // Call HN API to get list of all IDs
    const hnUrl = getHNApiByType(type);
    try {
      const apiResponse = await fetch(hnUrl);
      const data = await apiResponse.json();

      response = { data };
    } catch (error) {
      const apiError: Error = {
        message: `Something went wrong when querying HN API for stories of type ${type}`,
      };
      response = { error: apiError };
    }
  } else {
    const error: Error = {
      message: `Story type ${type} is not supported. Supported story types are ${supportedStoryTypes}`,
    };
    response = { error };
  }
  console.log(response);
  return NextResponse.json(response, { status: 200 });
}
