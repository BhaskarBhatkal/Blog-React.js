import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.appwrite";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [allposts, setAllPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setAllPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allposts.map((post) => (
            <div key={post.$id} className="p-2 w-1/2">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
