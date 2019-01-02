const { GraphQLServer } = require('graphql-yoga');

//1


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  let idCount = links.length;
//2
const resolvers = {
    Query: {
        info: () => "this is the hackernews api clone",
        feed: () => links,
        link: (parent, args) => {
            console.log(parent,args);
            links.forEach(linkItem => {
                console.log(linkItem);
                console.log(linkItem.id);
                console.log(args.id);
                if(linkItem.id === args.id){
                    console.log("Inside this");
                    return linkItem;
                } else {
                    return "No such id";
                }
            })
        }
    },
    Mutation:{
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            links.find(link => {
                return link.id === args.id;
            })
            
        }
        
        
    },
    // No need of this as GraphQL server infers what they look like
/*     Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
      } */
}

//3 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`server is running at http://localhost:4000`));