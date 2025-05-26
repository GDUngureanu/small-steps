<!-- 
    Enums:

    "airingStatus": [
        "Finished Airing",
        "Currently Airing",
        "Not Yet Aired",
        "Cancelled"
    ]

    "viewStatus": [
        "Plan to Watch",
        "Watching",
        "Completed",
        "On Hold",
        "Dropped",
        "Rewatching"
    ]
-->

<script setup>
import articleTemp from '../../templates/article.vue';
import suggestionsTemp from '../../templates/suggestions.vue';
</script>

<script>
import animeList from './data.json';
import suggestions from './suggestions.json';

export default {
    name: 'AnimeTemplate',
    data() {
        return {
            suggestions: suggestions,
            animeList: animeList
        };
    }
};
</script>

<template>

    <articleTemp title="Anime List" meta="May 13, 2025 by G. D. Ungureanu">
        <p>I'm working on compiling a list of all the Anime that I've watched (or plan on watching).</p>
        <p>The list includes the anime's name, alias (if any), reference. airing status, my view status, the
            year I watched it, and my personal rating.</p>
        <p>I'm using <a href="https://myanimelist.net/" class="text-decoration-none">MyAnimeList.net</a> as my
            main source of reference.</p>

        <suggestionsTemp :suggestions="suggestions" />
        
        <p></p>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Airing</th>
                    <th>Airing Year</th>
                    <th>View Status</th>
                    <th>View Year</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="anime in animeList" :key="anime.name">
                    <td><a v-bind:href="anime.reference" class="text-decoration-none">{{ anime.name }}</a></td>
                    <td>{{ anime.airingStatus }}</td>
                    <td>{{ anime.airingYear ? anime.airingYear : "?" }}</td>
                    <td>{{ anime.viewStatus }}</td>
                    <td>{{ anime.viewYear ? anime.viewYear : "-" }}</td>
                    <td>{{ anime.personalRating ? anime.personalRating : "?" }}</td>
                </tr>
            </tbody>
        </table>
    </articleTemp>

</template>