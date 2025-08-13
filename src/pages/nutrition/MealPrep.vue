<script setup>
import ArticleTemplate from '@/components/shared/templates/Article.vue'

defineOptions({
  name: 'MealPrepTemplate',
})
</script>

<template>
  <ArticleTemplate title="Meal Prep" meta="Aug 1, 2025 by G. D. Ungureanu">
    <h3>Batch Cooking</h3>
    <p>Cook in bulk once or twice each week to save time and reduce cleanup.</p>
    <ul>
      <li>Select versatile proteins, grains, and vegetables.</li>
      <li>Season simply so meals can be mixed and matched.</li>
      <li>Portion after cooking to keep macro targets on track.</li>
    </ul>

    <h3>Storage</h3>
    <ul>
      <li>Store meals in airtight containers labeled with the cooking date.</li>
      <li>Refrigerate up to three days of food and freeze the rest.</li>
      <li>Reheat portions only once for best texture and safety.</li>
    </ul>

    <h3>Macro Targets</h3>
    <p>Aim for balanced meals hitting roughly:</p>
    <ul>
      <li><strong>Protein:</strong> ~25 g</li>
      <li><strong>Carbohydrates:</strong> ~40 g</li>
      <li><strong>Fats:</strong> ~15 g</li>
    </ul>

    <h3>Weekly Meal Plan</h3>
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Day</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>Chicken, rice & greens</td>
            <td>Beef chili</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>Turkey meatballs & pasta</td>
            <td>Salmon with sweet potato</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>Quinoa salad with beans</td>
            <td>Stir-fried tofu & veggies</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>Leftover chili</td>
            <td>Chicken curry & rice</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>Tuna wraps</td>
            <td>Roasted pork & veggies</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Shopping List Template</h3>
    <ul>
      <li><strong>Proteins:</strong> chicken breasts, turkey, salmon, eggs</li>
      <li><strong>Carbs:</strong> rice, pasta, sweet potatoes, oats</li>
      <li><strong>Vegetables:</strong> mixed greens, peppers, broccoli, onions</li>
      <li><strong>Extras:</strong> olive oil, spices, freezer bags</li>
    </ul>
  </ArticleTemplate>
</template>
