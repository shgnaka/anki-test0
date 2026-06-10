# Design QA

final result: blocked

## Completed checks

- The selected visual reference was inspected directly.
- Both reversible card directions are implemented.
- Front/back switching and dark-mode preview logic pass syntax checks.
- The standalone preview bundle builds successfully.
- The templates use native Anki replay controls and conditional fields.

## Blocker

The available in-app browser was unavailable, and the Chrome automation policy
blocked both the localhost preview and the bundled local file. Because a
same-state screenshot could not be captured, the required visual comparison
against the selected reference could not be completed.
