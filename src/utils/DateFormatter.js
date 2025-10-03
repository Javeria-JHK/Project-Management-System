export const formatCommentDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
  
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" , hour12: true,});
  } else {
 
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
};

export function formatDeadline(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);


  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}
