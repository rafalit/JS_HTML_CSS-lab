# Project: Web Application Tasks

This repository contains several web application tasks, demonstrating various functionalities using JavaScript, HTML, CSS, and Bootstrap 5. The following is a brief overview of each task:

---

## Task 1: **Interactive Clicker Game**
**Objective**: Create an interactive application with clickable elements (divs or images). Clicking on each element displays a specific message in the designated section. The game tracks the score, prevents clicking after certain score thresholds, and includes buttons for controlling the game flow.

**Features**:
- Yellow, Red, and Blue elements with different values
- Score tracking with specific rules
- Start/Stop button and other controls

---

## Task 2: **Shopping List Manager**
**Objective**: Implement a shopping list manager that allows adding items, setting priority (high-priority items are highlighted in red), and toggling item activation on click.

**Features**:
- Add new items to the shopping list
- Set and display priority items (in red)
- Toggle item activation on click
- Reset and change item order functionality

---

## Task 3: **Polish Cities Dashboard**
**Objective**: Create an interactive application that handles Polish cities data (from a JSON file). Display cities with specific filters, such as by population, region, or other criteria.

**Features**:
- Display cities from a specific region (e.g., Małopolskie)
- Filter cities by name or other attributes
- Show the fifth city by population density
- Display average area for cities from regions starting with the letter "P"

---

## Task 4: **Image Search Gallery**
**Objective**: Build an image search gallery where users can input keywords to search for images. The application fetches data from the Unsplash API and displays a carousel of images with navigation controls.

**Features**:
- Search and display images based on user input
- Horizontal image carousel with navigation
- Click to enlarge image with a LightBox-like effect
- Responsiveness: hide carousel on smaller screens (tablet and below)

---

## Task 5: **Responsive Web Layout with Carousel and Accordion**
**Objective**: Create a responsive webpage using Bootstrap 5, featuring a hamburger menu, an image carousel (slider), and accordion-style sections for text. The page should adapt to different screen sizes, hiding the carousel on tablets and smaller screens.

**Features**:
- **Hamburger Menu**: A collapsible menu for mobile and tablet screens, which displays the navigation items when clicked.
- **Image Carousel**: A responsive image slider (carousel) that displays images in a horizontal scroll. The carousel should hide on tablet-sized screens and below.
- **Accordion Sections**: Sections that can expand and collapse, allowing the user to view additional information. Each section should contain text and be collapsible using Bootstrap’s accordion component.
- **Responsiveness**: The layout should adapt to different screen sizes. For tablet-sized screens, the carousel should be hidden.

**Responsive Behavior**:
- The carousel is displayed by default on larger screens (desktops).
- On tablet screens and below, the carousel is hidden, and the layout adapts to a more compact format.

---

## Task 6: **Password Strength Checker**
**Objective**: Create a form to change the password with a visual strength indicator. The application verifies the strength of the new password and ensures the password and confirmation match.

**Features**:
- Password strength meter
- Visual feedback on password strength
- Password confirmation check (without a submit button)
- Option to toggle password visibility

---

## Task 7: **Zombie Shooter Game**
**Objective**: Implement a zombie shooter game where the player shoots zombies that appear randomly. The game includes a score system, random speed, size of zombies, and a highscore ranking system.

**Features**:
- Click to shoot zombies and earn points
- Zombies appear with random attributes (speed, size)
- Game ends when three zombies reach the end of the screen
- Highscore system with ranking and nickname input

---

## Task 8: **Countries Data Table**
**Objective**: Create a dynamic table that displays country data (from an external API). The table includes filtering, sorting, and pagination, and groups countries by subregion with additional statistical data.

**Features**:
- Dynamic table based on JSON data from the API
- Sorting and filtering by multiple columns
- Pagination to display a limited number of rows
- Group countries by subregion with statistical information (total population and area)
- Expandable sections to view country details

---

## Technologies Used:
- **HTML5**: Structure and layout
- **CSS3**: Styling (Bootstrap 5 for responsive design)
- **JavaScript**: Dynamic behavior, API handling, DOM manipulation
- **APIs**: RESTful APIs for fetching country data (e.g., [REST Countries API](https://restcountries.com/))

---

## Setup and Usage:
1. Clone this repository to your local machine.
2. Open `index.html` in your browser to start using the applications.
3. Follow the instructions within each task to interact with the application.

---

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

