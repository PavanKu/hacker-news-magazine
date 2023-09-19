"use client";
import { useEffect, useState } from "react"
import { StoryCard } from "../StoryCard";

type ListPageProps = {
    active: string
}

const BUCKET_SIZE = 10;

export const ListPage = ({ active }: ListPageProps) => {
    const [storyIds, setStoryIds] = useState<null|number[]>(null);
    const [storyDetails, setStoryDetails] = useState<any>([]);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        async function fetchIds() {
            const url = `/api/stories?type=${active}`;
            const response = await fetch(url);
            const {data:ids} = await response.json();
            setStoryIds(ids);
        }
        fetchIds()
    }, [active]);

    useEffect(() => {
        async function fetchStoryDetails(ids: number[]) {
            const url = `/api/storyDetailByIds?ids=${ids.join(',')}`;
            const response = await fetch(url);
            const {data:details} = await response.json();
            setStoryDetails((stories) => {
                return stories.concat(details);
            });
            // setOffset(offset+BUCKET_SIZE);
        }
        if(storyIds && storyIds.length>0) {
            const ids = storyIds.slice(offset, offset+BUCKET_SIZE);
            if(ids.length>0) {
                fetchStoryDetails(ids);
            }
        }
    }, [storyIds, offset]);

    return (
        <div className="container mx-auto flex flex-row flex-wrap py-10">
            {
                storyDetails && storyDetails.map(detail => {
                    return <StoryCard key={detail.id} detail={detail}/>
                })
            }
        </div>
    );
}