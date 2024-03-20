export function GetFileNameFromUri(uri) {
    const segments = uri.split('/');
    const imageName = segments.pop();
    return imageName;
}