const categories = document.getElementById("categories");

categories.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (categories.value == "all") {
    url.searchParams.delete("category");
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  } else {
    url.searchParams.set("category", categories.value);
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  }
});

const sort = document.getElementById("sort");

sort.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (sort.value == "unordered") {
    url.searchParams.delete("sort");
    window.location.href = url.toString();
  } else {
    url.searchParams.set("sort", sort.value);
    window.location.href = url.toString();
  }
});

const statusOpt = document.getElementById("status");

statusOpt.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (statusOpt.value == "all") {
    url.searchParams.delete("status");
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  } else {
    url.searchParams.set("status", statusOpt.value);
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  }
});
