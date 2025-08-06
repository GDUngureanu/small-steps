<script setup>
import ArticleTemplate from '../../../templates/article.vue';
import SuggestionsTemplate from '../../../templates/suggestions.vue';
import suggestions from './suggestions.json';

defineOptions({
    name: 'BooksTemplate'
});
</script>

<template>

    <ArticleTemplate title="Books" meta="Jun 4, 2025 by G. D. Ungureanu">
        <p>Work work work.</p>

        <SuggestionsTemplate :suggestions="suggestions" />
    </ArticleTemplate>

    <ArticleTemplate title="Atomic Habits" meta="Jun 7, 2025 by G. D. Ungureanu">

        <a href="https://jamesclear.com/atomic-habits" class="text-decoration-none">
            Atomic Habits by James Clear
        </a>

        <p><em>
            <input type="checkbox" class="form-check-input"> TODO: Add notes about <strong>Outcome-Based Habits</strong> <br>
            <input type="checkbox" class="form-check-input"> TODO: Add notes about <strong>Identity-Based Habits</strong> <br>
            Inspired from the following article: https://medium.com/@gargsourabh/atomic-habits-chapter-2-461990874c9c <br>
            <input type="checkbox" class="form-check-input"> TODO: Refine this and express it in your own words: <br>
            Change in outcomes: It is result-oriented change, like publishing a book or winning a championship. <br>
            Change in the process: It means a change in the system or procedure, like implementing a new gym routine or following a diet plan. <br>
            Change in identity: It concerns with change in your beliefs, self-image, assumptions, and associated biases.
        </em></p>

        <h4 class="my-3">Small difference in direction leading to a different path</h4>

        <p>
            Good habits make time your allay.
            <br>
            Bad habits make time your enemy.
        </p>

        <p>
            Habits is how you embody your <strong>Identity</strong>.
            <br>
            What is your <strong>Identity</strong>?
        </p>

        <h5>Identities:</h5>
        <ul>
            <li>I am a leader.</li>
            <li>I am a musician.</li>
            <li>I am a developer.</li>
            <li>I am a sloth.</li>
            <li>I am a dreamer.</li>
            <li>I am a skinny.</li>
            <li>I am a week.</li>
            <li>I am a slow.</li>
            <li>I am always late.</li>
            <li>I am dumb.</li>
            <li>I am not a morning person.</li>
            <li>I never remember things.</li>
        </ul>

        <h5>Habit Loop:</h5>
        <ul>
            <li><strong><a href="https://jamesclear.com/habit-triggers" class="text-decoration-none">Cue</a></strong>: The cue is the trigger that initiates the habit.</li>
            <ul>
                <li><strong>Phone buzzes</strong>.</li>
                <li><strong>Answering emails</strong>.</li>
                <li><strong>Waking up</strong>.</li>
            </ul>
            <li><strong>Craving</strong>: The craving is the desire or motivation that drives the habit.</li>
            <ul>
                <li>You <u>want to learn the context of the notification</u>.</li>
                <li>You begin to feel stressed and overwhelmed by work, you <u>want to feel in control</u>.</li>
                <li>You <u>want to feel alert</u>.</li>
            </ul>
            <li><strong>Response</strong>: The response is the actual action or behavior that fulfills the craving.</li>
            <ul>
                <li>You <strong>grab the phone</strong> and check the notification.</li>
                <li>You <strong>bite your nails</strong>.</li>
                <li>You <strong>drink a cup of coffee</strong>.</li>
            </ul>
            <li><strong>Reward</strong>: The reward is the positive outcome that reinforces the habit.</li>
            <ul>
                <li>Satisfy the craving <u>to check the notification</u>.</li>
                <li>Satisfy the craving <u>to reduce stress</u>.</li>
                <li>Satisfy the craving <u>to feel alert</u>.</li>
            </ul>
            <li><strong>Outcome</strong>:</li>
            <ul>
                <li><strong>Grabbing the phone</strong> becomes associated with <strong>your phone buzzing</strong>.</li>
                <li><strong>Biting your nails</strong> becomes associated with <strong>reading your emails</strong>.</li>
                <li><strong>Drinking coffee</strong> becomes associated with <strong>waking up</strong>.</li>
            </ul>
        </ul>

        <h5>The 4 Laws of Behavior (Good Habit):</h5>
        <ul>
            <li>(Cue) Make it obvious.</li>
            <li>(Craving) Make it attractive.</li>
            <li>(Response) Make it easy.</li>
            <li>(Reward) Make it satisfying.</li>
        </ul>

        <h5>The 4 Laws of Behavior (Bad Habit):</h5>
        <ul>
            <li>(Cue) Make it invisible.</li>
            <li>(Craving) Make it unattractive.</li>
            <li>(Response) Make it difficult.</li>
            <li>(Reward) Make it unsatisfying.</li>
        </ul>
        
        <p><em>
            <input type="checkbox" class="form-check-input"> TODO: Add notes about <strong>Habit Stacking</strong> <br>
            <input type="checkbox" class="form-check-input"> TODO: Add notes about <strong>Building Habits</strong> <br>
            I will do (ACTION/HABIT/GOAL). <br>
            At (TIME). <br>
            In (LOCATION).
        </em></p>

        <p><em>When we treat man as he is, we make him worse than he is; <br>
            When we treat him as if he already were what he potentially could be, we make him what he should be.</em> <br>
             - Johann Wolfgang von Goethe</p>

    </ArticleTemplate>
</template>
