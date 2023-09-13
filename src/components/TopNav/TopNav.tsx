import { TopNavProps } from "@/types/navigation";
import { useRouter } from "next/router";
import React from "react";

export const TopNav = ({items, active}:TopNavProps) => {
    const inactiveClass: string = "inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2  hover:bg-white hover:text-gray-700 hover:shadow";
    const activeClass:string = 'bg-white shadow text-gray-700';

    const getClass = (val:string):string => {
        if(val === active) {
            return `${inactiveClass} ${activeClass}`; 
        } else {
            return inactiveClass;
        }
    }

    const getURL = (val: string): string => `/stories/${val}`;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
            <ul className="flex items-center gap-2 text-sm font-medium">
                {items.map((item) => {
                    const {label, value} = item;
                    return (
                        <li key={value}>
                            <a  className={getClass(value)} href={getURL(value)}>{label}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}