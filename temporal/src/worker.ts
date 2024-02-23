import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'), // passed to Webpack for bundling
        activities, // directly imported in Node.js
        taskQueue: 'ecommerce-oneclick',
    });
    await worker.run();
}
run().catch((err) => console.log(err));

