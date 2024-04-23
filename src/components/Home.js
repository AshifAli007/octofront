const Home = () => {
    return (
        <div>
            <header>
                <h1>Welcome to Our File Management Platform - An Implementation of Octopus
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
        </div>
    )
}

export default Home;