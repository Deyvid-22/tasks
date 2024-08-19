import { ChangeEvent, FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "./styles.module.css";
import Head from "next/head";
import { FaTrash } from "react-icons/fa";

import { TextArea } from "../../components/textArea";

import { useSession } from "next-auth/react";
import { db } from "@/services/fireBaseConnection";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

interface TaskProps {
  item: {
    tarefa: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  };
  allComments: CommentProps[];
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();

  const [input, setInput] = useState("");

  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (input == "") return;

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user.email,
        name: session?.user.name,
        taskId: item?.taskId,
      });

      const data = {
        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      };

      setComments((oldItems) => [...oldItems, data]);

      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      let deleteComment = comments.filter((item) => {
        item.id !== id;
      });

      window.document.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Detlalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefas</h1>
        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.comentsContainer}>
        <h2>Deixar comentário</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          <TextArea
            placeholder="Digite seu comentário..."
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
          />

          <button className={styles.button} disabled={!session?.user}>
            Enviar comentário
          </button>
        </form>
      </section>

      <section className={styles.comentsContainer}>
        <h2>Todos os comentários</h2>
        {comments.length === 0 && <span>Nenhum comentário foi encontrado</span>}

        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div>
              <div className={styles.headeContent}>
                <label className={styles.commentsLabel}>{item.name}</label>
                {item.user === session?.user?.email && (
                  <button
                    className={styles.buttonTrash}
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash size={18} color="#ea3140" />
                  </button>
                )}
              </div>
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tarefas", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapsgitsComments = await getDocs(q);

  let allComments: CommentProps[] = [];

  snapsgitsComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

  console.log(allComments);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const milleseconds = snapshot.data()?.created.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(milleseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  // console.log(task);

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
