# Pokemon API

# Description
This is the second project we have completed as part of the Software Engineering Immersive program at General Assembly, taking place between 22/11/23 and 24/11/23. The project brief required that we build a React application that consumes a public API, contains several components, contains a router, and be deployed online.

# Deployment link: https://pokemonapi-ga.netlify.app/

# Timeframe & Working Team
This was a paired project between:
Ata Abatay (https://github.com/ataabatay)
Dan Edmunds (https://github.com/DanEdmunds1)

# Technologies Used
Front-end: React, JavaScript, SASS, HTML
Development Tools: Excalidraw

# Brief
Technical Requirements:
Build a React application that consumes a public API
It must have several components
The app can have a router with several "pages" - this is up to you and if it makes sense for your project
Include wireframes that you designed before building the app
Be deployed online and accessible to the public 
Necessary Deliverables:
A working application, hosted somewhere on the internet
A link to your hosted working app in the URL section of your Github repo
A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
A readme.md file with:
Explanations of the technologies used
A couple of paragraphs about the general approach you took
Installation instructions for any dependencies
Link to your wireframes – sketches of major views / interfaces in your application
Descriptions of any unsolved problems or major hurdles your team had to overcome
​
# Planning
Ata and I pair-coded the entire project, and to start off we drew a simple wireframe sketch to show the paths and elements we wanted from the different pages of our single page application. We wanted to include a dropdown to filter through pokemon by different types, the generation of game they first appeared in, and the region they were from. However, generation and region proved to be very difficult to access given that the endpoint for all pokemon only included the pokemon’s name and a url link to that individual pokemon’s API. This issue meant that we had to implement a lot of workarounds to display a picture for every pokemon when displaying all of their names.
We wanted to create a page that displayed every pokemon and picture of that pokemon, with the ability to click on any pokemon and move to a page that displayed its name, picture, types, and statistics.

# Build/Code Process
Rendering:
We started by creating paths, elements, and loaders for the home, index, and single view pages. Our first priority was to render the data we wanted from the API on each of these pages as this was a fairly new concept to us. It proved difficult to access the relevant data due to the fact that the endpoint for all Pokemon contained only each Pokemon’s name and the url for that specific Pokemon’s endpoint, more detail on this issue is provided in the challenges section.

Filters:
After the data was rendering in the desired way we moved our attention to the dropdown that would allow users to filter Pokemon by type. Due to the aforementioned issue with getting information from all Pokemon in the all-Pokemon endpoint we had to think of a workaround to access each pokemon’s type(s) without making thousands of calls to each of their endpoints. We found an endpoint in the API’s documentation that contains all Pokemon types, and in each type it lists all the names of the Pokemon that have this type. Using this endpoint we created a new React element that looked identical to the index page but instead made a call to the type endpoint and rendered all the Pokemon contained within that type.

The options of the dropdown bar are populated dynamically from the Pokemon types endpoint instead of being hard-coded, so if more types were to be added they would automatically be added to the dropdown and the filtered page would render correctly.

The search-bar uses Regex expressions and a filter array method to match the pattern found in the search-bar at a given time to the name of any Pokemon being rendered on either the all-Pokemon or filter page.

const [pokemon, setPokemon] = useState(pokemonType.pokemon)
    const [filters, setFilters] = useState('')
    const [filteredPokemon, setFilteredPokemon] = useState(pokemon)

    // Getting input from search bar
    function handleSearch(e) {
        setFilters(e.target.value)
    }

    // Filter effect rerendering each time search bar input changes
    useEffect(() => {
        setPokemon(pokemonType.pokemon)
        const pattern = new RegExp(filters, 'i')
        const filteredArray = pokemon.filter(creature => {
            return pattern.test(creature.pokemon.name)
        })
        setFilteredPokemon(filteredArray)
    }, [filters, pokemon, pokemonType.pokemon])

Images:
We wanted to display an image for each Pokemon on the index and filter pages, however neither endpoints used to render the Pokemon on these pages contained an image url. The only endpoint in which this was found was the single view page. Luckily the urls were exactly the same for each Pokemon except for the last number, which corresponded to the Pokedex number of each Pokemon. So we gave each Pokemon an absolute index starting at 1 and increasing by 1 for each Pokemon, and then inserted the index into a loop that would render each image url.

    // Getting absolute index for each pokemon
    const pokemonIndex = pokemonSearch.results.map((poke) => {
        return poke.name
    })

We then realised that the regional/variant pokemon image urls started at 10,000 for whatever reason, so we had to write conditional logic that accounted for this.

if (pokemonIndex.indexOf(creature.pokemon.name) + 1 <= 1017) {
 
 return (
    <img className="card-img-top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex.indexOf(creature.pokemon.name) + 1}.png`} alt={creature.pokemon.name} />
)
} else if (pokemonIndex.indexOf(creature.pokemon.name) + 1 > 1017 && pokemonIndex.indexOf(creature.pokemon.name) + 1 <= 10275) {

return (
<img className="card-img-top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex.indexOf(creature.pokemon.name) + 8984}.png`} alt={creature.pokemon.name} />
)

} else {
return
}

Styling:
The final task was to style our application using SCSS. Our design is fairly simple but we ensured to include a few reactive elements. I.e. the boxes that contain the Pokemon’s type on the single view page are automatically coloured according to the type, e.g. a fire type will always have an orange box.

# Challenges
Our biggest challenge was navigating how to use an API that only stored each Pokemon’s name and the url of their individual endpoint, which contained their image urls and type(s) that we wanted to display on our index page. A solution to part of the problem was using multiple API calls in a single loader, allowing us to render all Pokemon on the index page as well as all the Pokemon types to populate the filter dropdown options. We did not know that this was something we could do so it took a while to find this solution.
Another work-around we used was dynamically changing the number passed into the image urls as mentioned in the Build/Code Process earlier.

Another challenge we faced was getting our search bar to work. We worked until late on Thursday evening trying to figure it out but then called it a night and said we would try again tomorrow and/or ask for some help. The issue was the state variable we wanted to use to store and update the array of filtered pokemon for the pokemon-by-type page was not updating each time the page was filtered using the search bar. So after a few hours being away from my PC, I figured out how to fix this, and also realised we were not selecting each pokemon’s name correctly. Once these two issues were fixed, the search bar worked as intended.

# Wins
Coming up with the solutions to our challenges mentioned above was certainly a big win. Another win was that we were very happy with the styling, which I assumed would take longer as we hadn’t used many of its features in the past but it went fairly well.

# Key Learnings/Takeaways
I feel a lot more confident with using React and APIs in general now that I have more experience working with them. I have a better understanding of how I can use loaders and states to select, manipulate, and render the data from an API that I choose. It was also a great experience to work in a pair for this project. Ata was a pleasure to work with as a person and as a teammate, he was extremel;y helpful in pointing out errors in the code as I was typing and in coming up with clever solutions to problems we were having. A second set of eyes is really useful when coding and I hope to continue working in a team within this course and when I start my career.

# Bugs: There are currently no bugs in this application that we have identified

# Future Improvements
It would be nice to add more filters to the dropdown tab. We had an idea to create a nested dropdown to allow users to search for pokemon by type and the generation of game they first appeared in, but we did not have enough time to implement this. We could also include spinners to take the place of the pokemon images as they load in to create a more responsive design, but again we were limited by the short window of this project.