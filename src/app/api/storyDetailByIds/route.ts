import { NextResponse } from "next/server";
import ogs from 'open-graph-scraper';

import type { NextRequest } from "next/server";
import type { APIResponse, Error } from "@/app/api/types/response";
import { BASE_HN_URL } from "@/app/api/constatnts";

function getAPIByStoryId(id: number): string {
  return `${BASE_HN_URL}item/${id}.json`;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<APIResponse>> {
  let response: APIResponse;
  const query = request.nextUrl.searchParams;
  const value = query.get("ids");

  if (value) {
    const ids: number[] = value.split(",").map((n) => Number(n));
    const apiResponses = await Promise.allSettled(
      ids.map((id) => fetch(getAPIByStoryId(id)))
    );
    let successPromises = apiResponses
      .filter((res) => res.status !== "rejected")
      .map((res) => {
        if (res.status === "fulfilled") {
          return res.value.json();
        }
      });
    const successResponses = await Promise.allSettled(successPromises);
    let data = successResponses
      .filter((res) => res.status !== "rejected")
      .map((res) => {
        if (res.status === "fulfilled") {
          return res.value;
        }
      });
      const metaPromises = data.map(detail => {
        if(detail.url) {
            return new Promise((resolve, reject) => {
                ogs({ url: detail.url })
                .then((data) => {
                    const { error, html, result, response } = data;
                    console.log('========Resolved==========');
                    if(error) {
                        reject({ message: `Unable to fetch open-graph values for ${detail.url}`});
                    } else if(result.success){
                        detail.meta = result;
                        resolve(detail);
                    } else {
                        reject({ message: `Unable to fetch open-graph values for ${detail.url}`});
                    }
                })
                .catch((data) => {
                  console.log('========Error========');
                  reject({ message: `Unable to fetch open-graph values for ${detail.url}`});
                });
            })
        } else {
            return Promise.resolve(detail);
        }
      });

    let detailWithMeta = await Promise.allSettled(metaPromises);
    detailWithMeta = detailWithMeta
        .filter((res) => res.status !== "rejected")
        .map((res) => {
            if (res.status === "fulfilled") {
            return res.value;
            }
        });
    // @ts-ignore
    response = { data: detailWithMeta };
  } else {
    const error: Error = { message: `ids are required as query param` };
    response = { error };
  }

  return NextResponse.json(response, { status: 200 });
}
