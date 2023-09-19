function getPostTime(timestamp: number): string {
    const date = new Date(timestamp*1000);
    return date.toDateString();
}
//@ts-ignore
export const Card = ({detail}) =>  {
    return (
        <a href={detail.url} target="_blank" className="max-w-xs overflow-hidden rounded-lg bg-white shadow mr-5 mb-5">
            {detail.meta?.ogImage && <img src={detail.meta?.ogImage[0]?.url} alt="" />}
            <div className="p-4">
                {(detail.by || detail.time) && <p className="mb-1 text-sm text-primary-500">{detail.by && `${detail.by} .`} {detail.time && <time>{getPostTime(detail.time)}</time>}</p>}
                <h1 className="text-xl font-medium text-gray-900">{detail.title}</h1>
                {detail?.meta?.ogDescription && <p className="mt-1 text-gray-500">{detail.meta.ogDescription}</p>}
                {/* <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> Design </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> Product </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> Develop </span>
                </div> */}
            </div>
        </a>
    );

}