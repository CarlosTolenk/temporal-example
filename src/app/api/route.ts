import {NextRequest, NextResponse} from 'next/server'
import {Client, Connection} from "@temporalio/client";
import {OneClickBuy} from "../../../temporal/lib/workflows";

export async function GET(request: NextRequest) {
    const itemId = request.nextUrl.searchParams.get('itemId') as string;
    const connection = await Connection.connect();
    const client = new Client({connection});
    const transactionId = 'transactionId';

    await client.workflow.start(OneClickBuy, {
        taskQueue: 'ecommerce-oneclick',
        workflowId: transactionId,
        args: [itemId],
    });

    return NextResponse.json({data: {transactionId, itemId}}, {status: 200})
}
