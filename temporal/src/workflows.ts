import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities'; // purely for type safety

const { purchase } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
});

export async function OneClickBuy(id: string): Promise<string> {
    const result = await purchase(id); // calling the activity
    await sleep('10 seconds'); // demo use of timer
    return `Activity ID: ${result} executed, params ${id}`;
}
