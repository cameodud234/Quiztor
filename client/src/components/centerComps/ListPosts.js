import Post from "./PostWin";
import SearchBar from "../MenuComps/SearchBar";

function ListPosts(props){
    const posts = SearchBar.globalData;
    const postItems = posts.map((post, index)=>{
        // console.log(`post: ${post}, index: ${index}`)
        return (<li key={index}>
            <Post data={post} />
        </li>
        );
    });
    return (
        <ul>
            {/* {console.log(postItems)} */}
            {postItems}
        </ul>
    );
}

export default ListPosts;