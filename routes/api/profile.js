import express from 'express';
import passport from 'passport';
import User from '../../models/User';
import Profile from '../../models/Profile';
import validateProfileInput from '../../validation/profile';
import validateExperienceInput from '../../validation/experience';
import validateEducationInput from '../../validation/education';

const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    const { handle } = req.params;

    Profile.findOne({ handle: handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    const { user_id } = req.params;

    Profile.findOne({ user: user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There is no profile for this user' })
        );
});

// @route   GET api/profile
// @desc    GET current users' profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const { id } = req.user;
    Profile.findOne({ user: id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create users' profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const profileFields = {};
        const { id } = req.user;
        profileFields.user = id;

        const { handle, company, website, location, bio, status, githubusername,
            skills, youtube, twitter, facebook, linkedin, instagram } = req.body;

        if (handle) profileFields.handle = handle;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;

        if (typeof skills !== undefined) {
            profileFields.skills = skills.split(',');
        }

        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;


        Profile.findOne({ user: id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: id },
                        { $set: profileFields },
                        { new: true })
                        .then(profile => res.json(profile));
                } else {
                    Profile.findOne({ handle: profileFields.handle }).then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                            .catch(err => res.json(err));
                    });
                }
            })
    });

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);
        const { title, company, location, from, to, current, description } = req.body;
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            };

            // Add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);
        const { school, degree, fieldofstudy, from, to, current, description } = req.body
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            };

            // Add to exp array
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOne({ user: id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOneAndRemove({ user: id }).then(() => {
            User.findOneAndRemove({ _id: id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);

module.exports = router;
