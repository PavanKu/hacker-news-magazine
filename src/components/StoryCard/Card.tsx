export const Card = ({detail}) =>  {
    return (
        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            {detail.meta?.ogImage && <img src={detail.meta?.ogImage[0]?.url} alt="" />}
            <div className="p-4">
                <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p>
                <h3 className="text-xl font-medium text-gray-900">{detail.title}</h3>
                {detail?.meta?.ogDescription && <p className="mt-1 text-gray-500">{detail.meta.ogDescription}</p>}
                <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> Design </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> Product </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> Develop </span>
                </div>
            </div>
        </div>
    );

}