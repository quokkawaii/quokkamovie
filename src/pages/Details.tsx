import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  type CastMember = {
    name: string;
  };
  type Home_movie = {
    id: number; // 영화 고유 ID
    title: string; // 영화 제목
    rating: number; // 영화 평점
    genres: string[]; // 장르 배열
    small_cover_image: string; // 작은 포스터 이미지 URL
    medium_cover_image: string;
    large_cover_image: string; // 큰 포스터 이미지 URL
    year: string;
    cast: CastMember[];
    runtime: number;
  };

  let { details_id } = useParams();
  const [detail_loading, set_detail_loading] = useState<boolean>(true);
  const DETAIL_MOVIE_API: string = `https://movies-api.accel.li/api/v2/movie_details.json?movie_id=${details_id}&with_cast=true`;
  const [detail_movie_data, set_detail_movie_data] = useState<Home_movie>();
  const details_movie_fetch = async () => {
    const response = await fetch(DETAIL_MOVIE_API);
    const json = await response.json();
    set_detail_movie_data(json.data.movie);
    set_detail_loading(false);
  };

  const [details_view, setDetails_view] = useState<string>("info");

  useEffect(() => {
    details_movie_fetch();
  }, []);

  useEffect(() => {}, [detail_loading]);

  const onChange_details_item = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setDetails_view("info");
  };

  const onChange_details_category = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setDetails_view("category");
  };

  console.log(details_id, detail_movie_data);
  return (
    <div className="details">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="homeTitle">Quokka Movie</div>
      </Link>
      <div className="details_content">
        <div className="details_header">
          <div className="details_title">영화</div>
          <button
            className="deatails_info details_item"
            onClick={onChange_details_item}
          >
            정보
          </button>
          <button
            className="details_category details_item"
            onClick={onChange_details_category}
          >
            카테고리
          </button>
        </div>
        <div className="details_main">
          {details_view === "info" ? (
            <div className="details_main">
              <img src={detail_movie_data?.medium_cover_image} />
              <div className="details_main_content">
                <div> Title : {detail_movie_data?.title}</div>
                <div> Year : {detail_movie_data?.year}</div>
                <ul>
                  <div>Cast </div>
                  {detail_movie_data?.cast.map((v: CastMember, i) => (
                    <li key={i}>{`${i + 1} : ${v.name}`}</li>
                  ))}
                </ul>
                <div>RunTime : {detail_movie_data?.runtime} 분</div>
                <div>Rating : {detail_movie_data?.rating} 점</div>
              </div>
            </div>
          ) : (
            <div>
              <ul className="details_ctg">
                {detail_movie_data?.genres.map((v, i) => (
                  <li key={i}>
                    <Link to={`/category/${v}`}>
                      <button>{v}</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
