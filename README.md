# bowling-challenge
A bowling score calculator module for a coding challenge.

## Setup
Run `npm install` to install dependencies.

## Testing
To run the tests, use `npm test`

## Notes
The module assumes the scores will be in string format. Games are validated for
frames that include invalid characters or too many pins, and for games that
include too many or too few frames. Games that include too few bonus throws
as part of a bonus frame that includes a spare will not throw validation errors.
