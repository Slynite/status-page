import { remark } from "remark";
import html from 'remark-html';

const dateFormat: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Berlin', timeZoneName: 'short'  };

export function getFormattedDate(date: string): string {
    console.log(date);
    return new Intl.DateTimeFormat("en-US", dateFormat).format(Date.parse(date));
}

export async function convertStringToHtml(string: string): Promise<string> {
    const processedContent = await remark().use(html).process(string);
    return processedContent.toString();
}
