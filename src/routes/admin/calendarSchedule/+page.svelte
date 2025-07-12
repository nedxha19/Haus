<script>
	import { onMount } from 'svelte';

	let today = new Date();
	let activeDay = today.getDate();
	let month = today.getMonth();
	let year = today.getFullYear();
	let dateInput = '';
	let showAddTask = false;
	let taskName = '',
	   taskAuthor = '',
		taskDescription = '',
		taskDate = '';
	let selectedTasks = [];
	let errorMsg = '';

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let eventsArr = [];
	let eventLookup = new Map();

	// === INIT ===
	onMount(() => {
		const stored = localStorage?.getItem('events');
		if (stored) eventsArr = JSON.parse(stored);
		rebuildEventLookup();
		updateTasks(activeDay);
	});

	$: rebuildEventLookup();
	$: updateTasks(activeDay);

	// === HELPERS ===
	const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();

	const getDayOfWeek = (y, m, d) =>
		new Date(y, m, d).toLocaleDateString('en-US', { weekday: 'short' });

	const getKey = (d, m, y) => `${d}-${m}-${y}`;

	function rebuildEventLookup() {
		eventLookup.clear();
		for (const ev of eventsArr) {
			eventLookup.set(getKey(ev.day, ev.month, ev.year), true);
		}
	}

	const hasTask = (d) => eventLookup.has(getKey(d, month + 1, year));

	const isToday = (d) => {
		const now = new Date();
		return d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
	};

	const selectDay = (d) => (activeDay = d);

	function updateTasks(d) {
		const found = eventsArr.find((e) => e.day === d && e.month === month + 1 && e.year === year);
		selectedTasks = found?.events ?? [];
		saveEvents();
	}

	function prevMonth() {
		month = month === 0 ? 11 : month - 1;
		year = month === 11 ? year - 1 : year;
		activeDay = 1;
	}

	function nextMonth() {
		month = month === 11 ? 0 : month + 1;
		year = month === 0 ? year + 1 : year;
		activeDay = 1;
	}

	function gotoDate() {
		const [m, y] = dateInput.split('/').map(Number);
		if (m >= 1 && m <= 12 && y.toString().length === 4) {
			month = m - 1;
			year = y;
			activeDay = 1;
		} else {
			alert('Invalid Date');
		}
	}

	function addTask() {
		errorMsg = '';
		if (!taskName || !taskAuthor || !taskDescription || !taskDate) {
			errorMsg = 'Please fill all fields.';
			return;
		}

		const dateObj = new Date(taskDate);
		const d = dateObj.getDate();
		const m = dateObj.getMonth() + 1;
		const y = dateObj.getFullYear();

		const existing = eventsArr.find((e) => e.day === d && e.month === m && e.year === y);
		const duplicate = existing?.events.some((ev) => ev.name === taskName);
		if (duplicate) {
			errorMsg = 'Task name must be unique for this day.';
			return;
		}

		const newTask = {
			id: crypto.randomUUID(),
			name: taskName,
			author: taskAuthor,
			description: taskDescription,
			date: taskDate,
			done: false
		};

		if (existing) {
			existing.events.push(newTask);
		} else {
			eventsArr.push({ day: d, month: m, year: y, events: [newTask] });
		}

		// Refresh view
		rebuildEventLookup();
		month = m - 1;
		year = y;
		activeDay = d;
		updateTasks(d);

		taskName = taskAuthor = taskDescription = taskDate = '';
		showAddTask = false;
	}

	const toggleDone = (task) => {
		task.done = !task.done;
		saveEvents();
		updateTasks(activeDay);
	};

	const saveEvents = () => localStorage?.setItem('events', JSON.stringify(eventsArr));

	const gotoToday = () => {
		today = new Date();
		month = today.getMonth();
		year = today.getFullYear();
		activeDay = today.getDate();
	};
</script>

<main class="calendar-page">
	<div class="calendar">
		<!-- Month Header -->
		<div class="month">
			<button type="button" class="prev" on:click={prevMonth} aria-label="Previous Month">
				<i class="fas fa-angle-left" aria-hidden="true"></i>
			</button>
			<div class="date">{months[month]} {year}</div>
			<button type="button" class="next" on:click={nextMonth} aria-label="Next Month">
				<i class="fas fa-angle-right" aria-hidden="true"></i>
			</button>
		</div>

		<!-- Weekdays -->
		<div class="weekdays">
			<div>Sun</div>
			<div>Mon</div>
			<div>Tue</div>
			<div>Wed</div>
			<div>Thu</div>
			<div>Fri</div>
			<div>Sat</div>
		</div>

		<!-- Days Grid -->
		<div class="days">
			{#each Array.from({ length: new Date(year, month, 1).getDay() }, (_, i) => i) as _}
				<div class="day prev-date" aria-hidden="true"></div>
			{/each}
			{#each Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1) as day}
				<button
					type="button"
					class="day {isToday(day) ? 'today' : ''} {activeDay === day ? 'active' : ''} {hasTask(day)
						? 'highlight'
						: ''}"
					aria-label={`Select day ${day}`}
					on:click={() => selectDay(day)}
				>
					{day}
				</button>
			{/each}
		</div>

		<!-- Goto and Today Buttons -->
		<div class="goto-today">
			<div class="goto">
				<input type="text" bind:value={dateInput} placeholder="mm/yyyy" />
				<button on:click={gotoDate}>Go</button>
			</div>
			<button on:click={gotoToday}>Today</button>
		</div>

		<!-- Selected Day Header -->
		<div class="today-date">
			<div class="event-day">{getDayOfWeek(year, month, activeDay)}</div>
			<div class="event-date">{activeDay} {months[month]} {year}</div>
		</div>

		<!-- Events List -->
		<div class="events">
			{#if selectedTasks.length > 0}
				{#each selectedTasks as task}
					<div class="event">
						<div class="title {task.done ? 'done' : ''}">
							<input type="checkbox" bind:checked={task.done} on:change={() => toggleDone(task)} />
							<h3 class="event-title">{task.name}</h3>
						</div>
						<div class="event-author"><strong>Author:</strong> {task.author}</div>
						<div class="event-description">{task.description}</div>
						<button class="done-btn" on:click={() => toggleDone(task)}>
							{task.done ? 'Undo Done' : 'Mark as Done'}
						</button>
					</div>
				{/each}
			{:else}
				<div class="no-event"><h3>No Tasks</h3></div>
			{/if}
		</div>

		<!-- Add Task Form -->
		<div class="add-event-wrapper {showAddTask ? 'active' : ''}">
			<div class="add-event-header">
				<div class="title">Add Task</div>
				<button
					type="button"
					class="close"
					on:click={() => (showAddTask = false)}
					aria-label="Close Add Task Form"
				>
					
				</button>
			</div>
			<div class="add-event-body">
				<div class="add-event-input">
					<input type="text" placeholder="Task Name" bind:value={taskName} />
				</div>
				<div class="add-event-input">
					<input type="text" placeholder="Author" bind:value={taskAuthor} />
				</div>
				<div class="add-event-input">
					<input type="text" placeholder="Description" bind:value={taskDescription} />
				</div>
				<div class="add-event-input">
					<input type="date" placeholder="Date" bind:value={taskDate} />
				</div>
				{#if errorMsg}
					<div class="error-msg" role="alert">{errorMsg}</div>
				{/if}
			</div>
			<div class="add-event-footer">
				<button class="add-event-btn" on:click={addTask}>Add Task</button>
			</div>
		</div>
	</div>
</main>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css';
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

	:global(:root) {
		--calendar-bg: #1a2236;
		--calendar-active: #0ea5e9;
		--calendar-hover: rgba(14, 165, 233, 0.15);
		--text-primary: #f3f4f6;
		--text-secondary: #9ca3af;
		--transition-speed: 0.3s;
		--border-radius: 8px;
		--tooltip-bg: rgba(26, 34, 54, 0.95);
		--calendar-today-bg: #0ea5e9;
		--calendar-event-bg: rgba(14, 165, 233, 0.1);
	}

	.calendar-page {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		background: var(--calendar-bg);
		color: var(--text-primary);
		font-family: 'Poppins', sans-serif;
	}

	.calendar {
		flex: 1;
		background: #222b44;
		border-radius: var(--border-radius);
		padding: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		min-height: calc(100vh - 40px);
		display: flex;
		flex-direction: column;
	}

	.month {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.month button {
		background: none;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		font-size: 1.5rem;
		transition: color 0.2s ease;
	}

	.month button:hover {
		color: var(--calendar-active);
	}

	.weekdays,
	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 10px;
		text-align: center;
	}

	.weekdays div {
		font-weight: 600;
		padding: 10px 0;
		color: var(--text-secondary);
	}

	.days button {
		background: none;
		border: none;
		color: var(--text-primary);
		font-size: 1rem;
		padding: 10px;
		border-radius: var(--border-radius);
		transition:
			background var(--transition-speed),
			color var(--transition-speed);
		cursor: pointer;
	}

	.days button:hover {
		background: var(--calendar-hover);
	}

	.days button.today {
		background: var(--calendar-today-bg) !important;
		color: white;
		font-weight: 600;
		border-radius: var(--border-radius);
		box-shadow: 0 0 0 2px white;
	}

	.days button.active {
		outline: 2px solid var(--calendar-active);
	}

	.day.highlight {
		background: var(--calendar-event-bg);
		border: 1px solid var(--calendar-active);
		color: white;
		font-weight: bold;
	}

	.goto-today {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.goto input {
		padding: 8px;
		border-radius: var(--border-radius);
		border: none;
		margin-right: 8px;
	}

	.goto button,
	.goto-today > button {
		padding: 8px 16px;
		background: var(--calendar-active);
		color: white;
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.goto button:hover,
	.goto-today > button:hover {
		background: #0284c7;
	}

	.today-date {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px 0;
		font-size: 1.2rem;
		font-weight: 500;
	}

	.events {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.event {
		background: #f9fafb; /* clean light card */
		border: 1px solid #e5e7eb;
		padding: 16px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		gap: 12px;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.event:hover {
		background: #f3f4f6;
		transform: translateY(-2px);
	}

	.event .title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 600;
		font-size: 1rem;
		color: #111827;
	}

	.event .event-title {
		margin: 0;
		font-size: 1.05rem;
	}

	.title.done h3 {
		text-decoration: line-through;
		color: #9ca3af;
	}

	.event input[type='checkbox'] {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	.event-author {
		font-size: 0.9rem;
		color: #6b7280;
		font-weight: 500;
	}

	.event-description {
		font-size: 0.9rem;
		color: #4b5563;
		font-style: normal;
	}

	.done-btn {
		align-self: flex-end;
		padding: 6px 14px;
		background: #10b981;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition: background 0.2s ease;
	}

	.done-btn:hover {
		background: #059669;
	}

	.done-btn:hover {
		background: #059669;
	}

	.no-event {
		text-align: center;
		color: #9ca3af;
		font-weight: 500;
		margin-top: 20px;
		font-style: italic;
	}

.add-event-wrapper {
  margin-top: 24px;
  background: #f9fafb;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.add-event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.add-event-header .title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.add-event-header button {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.add-event-header button:hover {
  color: #2563eb;
}


.add-event-body .add-event-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.add-event-body .add-event-input input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  font-size: 0.95rem;
  color: #111827;
  transition: border 0.2s ease;
}

.add-event-body .add-event-input input:focus {
  outline: none;
  border-color: #2563eb;
}


.error-msg {
  color: #ef4444;
  font-weight: 500;
  margin-top: 8px;
}


.add-event-footer button {
  padding: 10px 18px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-event-footer button:hover {
  background: #1d4ed8;
}


	.day.highlight {
		background: var(--calendar-event-bg);
		border: 1px solid var(--calendar-active);
		color: white;
		font-weight: bold;
	}
</style>
