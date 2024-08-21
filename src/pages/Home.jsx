import React, { useState, useEffect } from "react";
import appWriteServices from "../appwrite/config.appwrite";
import { Container, PostCard } from "../components";

function Home() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    appWriteServices.getPosts().then((posts) => {
      if (posts) {
        setAllPosts(posts.documents);
      }
    });
  }, []);

  if (allPosts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex  flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500 ">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
