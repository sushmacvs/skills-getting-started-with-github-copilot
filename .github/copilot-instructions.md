# Copilot cloud agent instructions for this repository

## Repository purpose
This repository is a GitHub Skills exercise for learning GitHub Copilot. The runnable code is a small FastAPI app for managing student extracurricular signups.

## High-value file map
- `src/app.py`: FastAPI backend, in-memory `activities` data, API routes.
- `src/static/index.html`: frontend markup.
- `src/static/app.js`: frontend logic (fetch activities, submit signup).
- `src/static/styles.css`: frontend styling.
- `.github/workflows/*.yml`: exercise automation workflows (step checks, issue comments, progression).
- `.github/steps/*.md`: step instructions used by the exercise workflows.
- `requirements.txt`: Python runtime dependencies.
- `pytest.ini`: pytest config (`pythonpath = .`).

## How to run locally in agent environment
From repo root:
1. `python -m pip install -r requirements.txt`
2. `python -m uvicorn src.app:app --reload --reload-include "src/static/*"`
3. Open `http://127.0.0.1:8000/static/index.html` (API docs at `/docs`).

## Validation guidance
- There is no lint configuration in this repository.
- Use `python -m pytest` for tests when a task touches behavior.
- Current repository state has no committed tests, so pytest may report "no tests ran".

## Known errors encountered and workarounds
1. **Error:** Running `pytest` failed with `command not found` after `pip install -r requirements.txt`.
   - **Cause:** `pytest` is not listed in `requirements.txt`.
   - **Workaround used:** `python -m pip install pytest`, then run `python -m pytest`.

2. **Error:** `python -m pytest` exits with code `5` and `no tests ran`.
   - **Cause:** No test files currently exist in the repository.
   - **Workaround used:** Treat as expected baseline for this repo; if functional changes are made, add/adjust tests in a `tests/` directory as part of the task when appropriate.

## Change strategy for future agents
- Keep changes minimal and scoped to the requested step/task.
- Preserve exercise workflow logic in `.github/workflows/` unless the task explicitly requests workflow changes.
- For app behavior updates, prefer:
  - backend changes in `src/app.py` for API/data behavior
  - frontend updates in `src/static/app.js` and `src/static/styles.css` for UI behavior/presentation
- Maintain existing in-memory data model style in `src/app.py` unless migration is explicitly requested.

## Practical cautions
- Activity names are path parameters (`/activities/{activity_name}/signup`); frontend already uses `encodeURIComponent`.
- Backend signup currently appends emails without duplicate/capacity validation; verify intended behavior before changing it.
- The app serves static content from `src/static` via `app.mount("/static", ...)`; keep this routing intact unless required.
