export type postType =
    'Note' |
    'RSVP' |
    'Reply' |
    'Repost' |
    'Like' |
    'Video' |
    'Photo' |
    'Article' |
    'Event' |
    'Checkin' |
    'Bookmark' |
    'Audio' |
    'Invitation' |
    'Ate' |
    'Drank' |
    'Listen' |
    'Watch' |
    'Read' |
    'Bookmark' |
    'Trip';

const typeInference = {
    'rsvp': 'RSVP',
    'in-reply-to': 'Reply',
    'repost-of': 'Repost',
    'bookmark-of': 'Bookmark',
    'like-of': 'Like',
    'checkin': 'Checkin',
    'ate': 'Ate',
    'drank': 'Drank',
    'video': 'Video',
    'photo': 'Photo',
    'watch-of': 'Watch',
    'listen-of': 'Listen',
    'read-of': 'Read',
    'abode-trip': 'Trip'
};

export type Visibility = 'public' | 'private';

export function getPostType(postObject): postType {

    for (const attribute in typeInference) {
        if (postObject.properties[attribute] !== undefined) {
            return typeInference[attribute];
        }
    }

    if (postObject.files !== undefined && postObject.files.photo !== undefined && postObject.files.photo.length > 0) {
        return 'Photo';
    }

    // If name exists and it is not a prefix of the content, this is an article
    if ((postObject.properties.name !== undefined && postObject.properties.content.indexOf(postObject.properties.name) !== 0) ||
        (postObject.title !== undefined && postObject.title > '')) {
        return 'Article';
    }

    // Else it's a note
    return 'Note';
}
