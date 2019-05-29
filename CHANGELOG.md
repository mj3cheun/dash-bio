# Changelog

## [0.1.2] - 2019-05-29

### Fixed
* Fixed issue with Speck not responding to preset changes.
* Refactored Speck component and implemented general bug fixes.

## [0.1.0] - 2019-05-27

### Removed
* Removed all parsing tools in `dash_bio.utils` to a separate package,
  `dash_bio_utils`.

## [0.0.11] - 2019-05-09

### Added
* Added to xyz_reader the ability to handle whitespace at the
  beginning and end of a line (in data file).
* Added a working link to the JS distribution, so serving scripts
  locally is no longer necessary.

## [0.0.10] - 2019-04-30

### Fixed
* Fixed homepage link in package metadata.

## [0.0.9] - 2019-04-29

### Fixed
* Fixed issue with Clustergram rows and columns reordering incorrectly
  on the heatmap when precomputed traces are used to generate the
  figure.
* Fixed issue with Speck not rendering unless it is attached to a
  callback.
* Prevented Speck from trying to calculate a system with no atom.
* Let Clustergram render even when row and column labels are not
  specified, by adding default values.
* Allowed multiple SequenceViewer components to render on the same
  application.

### Changed
* Changed Clustergram to only return a figure by default, so that
  values no longer need to be unpacked.
* Changed Molecule3dViewer's `selectionType` prop to accept all-
  lowercase values.

### Added
* Added to Clustergram the ability to generate a "curve dictionary" to
  translate curve number (available in hoverData/clickData) to the row
  or column cluster it represents on the graph.

## [0.0.8] - 2019-01-04

### Fixed
* Fixed issue with Clustergram not reordering rows and columns after
  clustering.

### Removed
* Removed mentions of Dash events in OncoPrint component.
* Removed properties which weren't used in Ideogram component.

### Changed
* Changed property `fullChromosomeLabels` so that it can be updated
  using dash callbacks.
* Changed Imputer (deprecated) to SimpleImputer in Clustergram
  component.
* Changed property name `impute_function` to `imputer_parameters` in
  Clustergram component.
* Changed install requirement to Dash version 0.40.0 or greater.

### Added
* Added ability to define custom colors in style parser for
  Molecule3D.

## [0.0.7] - 2019-26-02

### Changed
* Changed unicode right arrow to greater-than sign in Circos for
  compatibility with Python 2.7.

## [0.0.6] - 2019-22-02

### Added
* Added requirements from files in `utils`, as well as from
  pure-Python components, to setup install requirements.
* Added more descriptive prop descriptions for Dash Ideogram.

## [0.0.5] - 2019-15-02

### Changed
* Changed filenames in `dash_bio/utils/` folder to be snake case
  instead of camel case.

## [0.0.4] - 2019-11-02

### Added
* Added recent update to Speck library to fix jumpy behavior on
  click-and-drag.

## [0.0.3] - 2019-06-02

### Added
* Added variables to define strings used in `_volcano.py` graph
  labels.

## [0.0.2] - 2019-05-02

### Fixed
* Fixed incompatibility issues with Dash `0.36.0`.

### Removed
* Removed all mentions of `fireEvent` and anything else that used Dash
  events (which have been removed).
