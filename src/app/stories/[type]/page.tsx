import { ListPage } from "@/components/ListPage";
import { TopNav } from "@/components/TopNav";
import { Item } from "@/types/navigation";
import { useState } from "react";

const navItems: Item[] = [
    { label: "Best", value: "best" },
    { label: "Top", value: "top" },
    { label: "New", value: "new" },
    { label: "Ask", value: "ask" },
    { label: "Show", value: "show" },
    { label: "Jobs", value: "job" },
  ];

type StoryListPageProps = {
    params: {type: string},
}
export default function StoryListPage({ params }: StoryListPageProps) {
    const storyType = params.type;
    return (
        <main>
            <TopNav items={navItems} active={storyType}/>
            <ListPage active={storyType}/>
        </main>
    );
}