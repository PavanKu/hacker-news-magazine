import { ListPage } from "@/components/ListPage";
import { TopNav } from "@/components/TopNav";
import { Item } from "@/types/navigation";
import { useState } from "react";

const navItems: Item[] = [
    { label: "Best", value: "best" },
    { label: "Top", value: "top" },
    { label: "New", value: "new" },
  ];

type StoryListPageProps = {
    params: {type: string},
}
export default function StoryListPage({ params }: StoryListPageProps) {
    const active = params.type;
    return (
        <>
            <TopNav items={navItems} active={active}/>
            <ListPage active={active}/>
        </>
    );
}