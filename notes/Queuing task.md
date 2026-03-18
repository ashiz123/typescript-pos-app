Queue is the list of jobs waiting to be processed . This is one of the idea to handle large number of task at once. its library is BullmQ
BullmQ require IOredis, that makes redis modern way to handle. the store as - bull:order delayed

Example:
1) "bull:order:meta" --> thi says queue version, script, and more info  ---> Hash
2) "bull:order:events" -> this says live news, like job failed, job completed.... ---> Stream
3) "bull:order:id"--> counter --> number
4) "bull:order:1" --> Actual data store here ---> payload
5) "bull:order:marker" --> notify worker got new job. ---> String
6) "bull:order:delayed"--> This store the order that is set delayed ---> Zset


There are different type of data stored in redis. All that does not support same command. You need find the type first using "TYPE" than use command supoort to
that type of key.


ZRANGE : it retrieve data from ZSET . ZSET is hash sorting that store data by date and time.it use incase of delaying system
 "1"  key
"7259233332686848" value

when the time comes, it send to LSET. that hold data by queue system(FIFO)


Queue act as producer.

The steps to create the queue

1. Create the queue file ordeQueue.ts

const orderQueue = new Queue('order',
    host: process.env.REDIS_HOST || 'redis_pos',
    port: Number(process.env.REDIS_PORT || 6379),
    maxRetriesPerRequest: null,
})

2. Add the job in the queue in your controller or service
you need to call same orderQueue and add the job.
orderQueue.add(
            'auto-cancel',
            { orderId: newOrder._id },
            {
                delay: 1 * 60 * 1000,
                attempts: 3,
                removeOnComplete: true,
            }


3. Worker is the consumer. this call the worker file , worker defines what work to be done when that job is called

const orderWorker = new Worker('order', async(job: Job) => {
    const {orderId} = job.data   ----> This is the data added in job
    //then perform all the task you want to add this job
            const order = await orderRepository.orderById(orderId)

            if (!order) {
                throw new NotFoundError('Order does not exist')
            }

            if(order.status === 'pending'{
            await orderRepository.cancelOrder(orderId)
            }

 }
 you can use this function to see success, failure.
 orderWorker.success()
