import img1 from '../Assets/shard.avif';
import img2 from '../Assets/keys.avif';
const Home = () => {
    return (
        <div>
            <header>
                <h1>File Management Platform - An Implementation of Octopus
                </h1>
            </header>
            <main>
                <section>
                    <p>
                        Our platform provides a robust solution for managing files securely and efficiently. Leveraging cutting-edge technologies like React, Node.js, Axios, and Material-UI (MUI), we offer a dynamic user experience for uploading and retrieving files with ease. Our backend is powered by Node.js and communicates with MongoDB Atlas, ensuring high availability and scalability.
                    </p>
                    <p>
                        Data is stored in MongoDB Atlas, which utilizes <strong>sharding</strong> to distribute data across multiple servers, enhancing query response times and allowing our platform to scale horizontally as user demand increases. Each shard operates independently, reducing workload bottlenecks and increasing throughput.
                    </p>
                    <p>
                        Additionally, MongoDB Atlas ensures data durability and high availability through <strong>replication</strong>. By replicating data across multiple nodes, our system guards against data loss and ensures that our service remains operational even if some of the database servers fail.
                    </p>
                    <p>
                        Advanced features include real-time data analytics, secure data transfer with HTTPS, and automated data backups, providing both performance and security to meet modern web application standards.
                    </p>
                </section>
            </main>
            <div>
                <h2 id="data-distribution" style={{ fontFamily: 'Euclid Circular A', fontWeight: 500 }}>Data Distribution</h2>
                <h3 id="shard-key">Shard Key</h3>
                <p>
                    MongoDB shards at the collection level. You choose which collection(s) you want to shard. MongoDB uses the
                    <strong> shard key</strong> to distribute a collection’s documents across shards.
                    MongoDB splits the data into “<strong>chunks</strong>”,
                    by dividing the span of shard key values into non-overlapping ranges. MongoDB then attempts to distribute those chunks evenly among the shards in the cluster.
                </p>
                <p>
                    <img alt="Shard keys in chunks in MongoDB" src={img2} />
                </p>
                <p>
                    Shard keys are based on fields inside each document. The values in those fields will decide on which shard the document will reside,
                    according to the shard ranges and amount of chunks. This data is stored and kept in the config server replica set.
                </p>
                <p>
                    <strong>The shard key has a direct impact on the cluster’s performance</strong> and should be chosen carefully.
                    A suboptimal shard key can lead to performance or scaling issues due to uneven chunk distribution.
                    You can always change your data distribution strategy by
                    <strong>changing your shard key</strong>.

                </p>
                <p>
                    A background process known as the “<strong>balancer</strong>”
                    automatically migrates chunks across the shards to ensure that each shard always has the same number of chunks.
                </p>
                <h3 id="sharding-strategy">Sharding Strategy</h3>
                <p>MongoDB supports two sharding strategies for distributing data across sharded clusters:</p>
                <ul>
                    <li><strong>Ranged Sharding</strong></li>
                    <li><strong>Hashed Sharding</strong></li>
                </ul>
                <p>
                    <strong>Ranged sharding</strong> divides data into ranges based on the shard key values. Each chunk is then assigned a range based on the shard key values.
                </p>
                <p>
                    <img alt="Shard keys in chunks in MongoDB" src={img2} />
                </p>
                <p>
                    A range of shard keys whose values are “close” are more likely to reside on the same chunk. This allows for targeted operations as a mongos can route the operations to only the shards that contain the required data.
                </p>
                <p>
                    <strong>Hashed Sharding</strong> involves computing a hash of the shard key field’s value. Each chunk is then assigned a range based on the hashed shard key values.
                </p>
                <p>
                    <img src={img1} />
                </p>
                <p>
                    While a range of shard keys may be “close”, their hashed values are unlikely to be on the same chunk.
                    Data distribution based on hashed values facilitates more even data distribution, especially in data sets where the shard key changes monotonically.
                    However, hashed sharding does not provide efficient range-based operations.
                </p>
            </div>
        </div>
    )
}

export default Home;