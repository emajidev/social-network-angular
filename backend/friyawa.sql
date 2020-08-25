-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-12-2018 a las 20:54:30
-- Versión del servidor: 5.7.24-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `friyawa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articles`
--

CREATE TABLE `articles` (
  `id_article` int(11) NOT NULL,
  `title` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `size` char(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `details` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(360) NOT NULL,
  `hashtags` varchar(260) DEFAULT NULL,
  `id_user` int(13) DEFAULT NULL,
  `number_article` int(15) DEFAULT NULL,
  `likes` int(15) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `articles`
--

INSERT INTO `articles` (`id_article`, `title`, `size`, `details`, `description`, `hashtags`, `id_user`, `number_article`, `likes`) VALUES
(1, 'Titulo 1', 'big', 'Detalles 1\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Vivamus tempus ultrices nisi vitae mollis. Mauris fermentum risus id enim vulputate euismod. Duis et massa quis eros maximus aliquet. Aliquam non ligula fringilla nunc imperdiet posuere. Sed porttitor dapibus magna ut mollis. Aenean at sollicitudin justo. Nulla consequat massa nunc, a sodales diam facilisis id. Mauris eget dignissim arcu, ut posuere purus.', '#animales#arte', 1, 1, 1),
(2, 'Titulo 2', 'medium', 'Esto es un detalle N3\r\nNullam tincidunt libero nisl', 'Aenean interdum cursus turpis, nec tincidunt velit accumsan ut. Quisque sed massa eu lectus eleifend sagittis id vel magna.', '#electronica#productos#regalos', 1, 2, 0),
(3, 'Titulo 3', 'length', 'Otro Detalle N4...\r\n\"Neque porro quisquam est qui dolorem ipsum quia dolor\"', 'Nulla consequat massa nunc, a sodales diam facilisis id. Mauris eget dignissim arcu, ut posuere purus.', '#punk#arte#music', 1, 3, 0),
(4, 'Impresiones 3D y mas!', 'length', 'Impresiones 3D y mucho más!', 'Si necesitas de piezas para tus obras de diseño artístico o arquitectónico, contacta con nosotros!', '#impresiones3D#arte', 2, 4, 0),
(5, 'Titulo 4', 'medium', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', '\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\"', '#arte#ropa', 2, 5, 0),
(6, 'Titulo 5', 'length', 'Proin convallis ipsum sed libero maximus, lacinia dictum elit auctor.', 'Nam tincidunt leo nec nunc bibendum, eu porttitor justo porttitor. Fusce mattis lorem et dui pulvinar, eget posuere nibh tempus. Morbi ac vestibulum eros, in molestie est.', '#are#musica#pop', 1, 6, 0),
(7, 'Titulo 6', 'medium', 'Donec venenatis vehicula tortor, in viverra ura.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis arcu justo. Sed at augue nec purus suscipit hendrerit. Curabitur mattis justo et augue aliquam', '#indie#ropa', 1, 7, 0),
(8, 'Un titulo mas!', 'big', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', 'Nullam at cursus lorem, eget mollis lacus. Phasellus commodo at lorem sit amet rutrum. Phasellus vel enim eleifend, ornare risus non,', '#literatura#cine', 1, 8, 0),
(9, 'Otro titulo de ejemplo!', 'medium', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', 'Nullam at cursus lorem, eget mollis lacus. Phasellus commodo at lorem sit amet rutrum. Phasellus vel enim eleifend, ornare risus non,', '#comida#sushi', 1, 9, 0),
(10, 'Rumba Caracas', 'length', 'Lorem ipsum dolor sit amet.....!', 'vehicula sapien. Mauris eu erat sit amet dui posuere pulvinar. Etiam id erat vehicula, fermentum nulla venenatis, feugiat arcu. Nullam ultrices efficitur velit quis venenatis.', '#rumba#Caracas#Pop', 1, 10, 1),
(11, 'Electronica China', 'big', 'Electronica China y miuhco mas! en Venta', 'Fusce vulputate gravida tellus a ornare. Sed sed sapien mauris. Nam condimentum rhoncus justo sed auctor. Sed et condimentum turpis, eu placerat tortor.', '#electronica#descuentos', 2, 11, 0),
(12, 'Mi item N11', 'medium', 'Nulla quam mi, lacinia non congue non, finibus eu ante. ', 'Nullam at cursus lorem, eget mollis lacus. Phasellus commodo at lorem sit amet rutrum. Phasellus vel enim eleifend, ornare risus non,', '#software#indie', 1, 12, 0),
(13, 'Freelancers Venezuela', 'medium', 'ellentesque eget leo feugiat, fringilla arcu vel', '\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\"', '#freelancer#arte', 1, 13, 0),
(14, 'TItulo 14', 'length', 'Proin convallis ipsum sed libero maximus, lacinia dictum elit auctor.', 'Nullam at cursus lorem, eget mollis lacus. Phasellus commodo at lorem sit amet rutrum. Phasellus vel enim eleifend, ornare risus non,', '#arte#cine', 1, 14, 0),
(15, 'Friyawa Freelancers Group', 'big', 'Lorem ipsum dolor sit amet, consectetur', 'Logos 2D, Impresiones 3D, Aplicaciones Web. Todo al mejor Precio! Contactanos! SIguenos en las redes.', '#freelancer#friyawa#logos', 1, 15, 1),
(16, 'Elctronica Pczatelca', 'medium', 'Electronica China y mucho mas! Envio gratis!', 'Nulla quam mi, lacinia non congue non, finibus eu ante. Maecenas sit amet malesuada lorem. Proin dignissim sit amet ligula at consectetur', '#Electronica#enviosGratis', 2, 16, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(13) NOT NULL,
  `content` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_article` int(11) NOT NULL,
  `id_user` int(13) NOT NULL,
  `number_comment` int(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `content`, `id_article`, `id_user`, `number_comment`) VALUES
(1, 'mi primer comentario!', 15, 1, 1),
(2, 'mi segundo comentario!', 15, 2, 2),
(3, 'mi tercer comentario!!', 16, 1, NULL),
(4, 'mi cuarto comentario!!', 16, 1, NULL),
(17, 'hola friyawa!', 15, 1, NULL),
(18, 'hola mundo', 15, 1, NULL),
(19, 'friyawa on fire!', 12, 1, NULL),
(20, 'comentario1', 12, 1, NULL),
(21, 'comenatrio 2', 12, 1, NULL),
(22, 'comenatrio 3', 12, 1, NULL),
(23, 'comenatrio4', 12, 1, NULL),
(24, 'hola mundo!!!!!!!', 12, 1, NULL),
(25, '1', 13, 1, NULL),
(26, '2', 13, 1, NULL),
(27, '3', 13, 1, NULL),
(28, '4', 13, 1, NULL),
(29, '5', 13, 1, NULL),
(30, '6', 13, 1, NULL),
(31, '7', 13, 1, NULL),
(32, '8', 13, 1, NULL),
(33, '9', 13, 1, NULL),
(34, '10', 13, 1, NULL),
(35, '11', 13, 1, NULL),
(36, '12', 13, 1, NULL),
(37, '13', 13, 1, NULL),
(38, '14', 13, 1, NULL),
(39, 'a', 13, 1, NULL),
(40, 'b', 13, 1, NULL),
(41, 'c', 13, 1, NULL),
(42, 'd', 13, 1, NULL),
(43, 'e', 13, 1, NULL),
(44, 'hol', 13, 1, NULL),
(45, 'mund', 13, 1, NULL),
(46, 'mi cuarto comentaro', 15, 1, NULL),
(47, 'el quinto!', 15, 1, NULL),
(48, 'el sexto!!', 15, 1, NULL),
(49, 'el septimo', 15, 1, NULL),
(50, 'el octavo', 15, 1, NULL),
(51, 'el noveno', 15, 1, NULL),
(52, 'el nvo comentario...', 15, 1, NULL),
(53, '\n\n', 15, 1, NULL),
(54, '', 15, 1, NULL),
(55, '', 15, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorite_articles`
--

CREATE TABLE `favorite_articles` (
  `id_favorite_article` int(12) NOT NULL,
  `id_article` int(11) NOT NULL,
  `id_user` int(13) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `favorite_articles`
--

INSERT INTO `favorite_articles` (`id_favorite_article`, `id_article`, `id_user`, `date`) VALUES
(157, 9, 1, '2018-12-10 00:10:09'),
(160, 16, 1, '2018-12-10 00:30:11'),
(161, 13, 1, '2018-12-10 00:46:11'),
(162, 10, 1, '2018-12-10 00:46:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liked_articles`
--

CREATE TABLE `liked_articles` (
  `id_liked_article` int(12) NOT NULL,
  `id_article` int(11) NOT NULL,
  `id_user` int(13) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `liked_articles`
--

INSERT INTO `liked_articles` (`id_liked_article`, `id_article`, `id_user`, `date`) VALUES
(51, 15, 1, '2018-12-10 00:47:26'),
(52, 10, 1, '2018-12-10 00:47:29'),
(53, 1, 1, '2018-12-10 00:47:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(13) NOT NULL,
  `username` varchar(230) NOT NULL,
  `password` varchar(30) NOT NULL,
  `social_links` varchar(600) DEFAULT NULL COMMENT 'array',
  `popularity` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `social_links`, `popularity`) VALUES
(1, 'Friyawa', '123456', 'http://www.facebook.com/friyawa.pczatelca.39;http://www.friyawa.com.ve', 50),
(2, 'Pczatelca', '123456', 'http://www.facebook.com/friyawa.pczatelca.39', 30);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id_article`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `number_article` (`number_article`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_article` (`id_article`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `favorite_articles`
--
ALTER TABLE `favorite_articles`
  ADD PRIMARY KEY (`id_favorite_article`),
  ADD KEY `id_article` (`id_article`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `liked_articles`
--
ALTER TABLE `liked_articles`
  ADD PRIMARY KEY (`id_liked_article`),
  ADD KEY `id_article` (`id_article`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articles`
--
ALTER TABLE `articles`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de la tabla `favorite_articles`
--
ALTER TABLE `favorite_articles`
  MODIFY `id_favorite_article` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;
--
-- AUTO_INCREMENT de la tabla `liked_articles`
--
ALTER TABLE `liked_articles`
  MODIFY `id_liked_article` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `favorite_articles`
--
ALTER TABLE `favorite_articles`
  ADD CONSTRAINT `favorite_articles_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`),
  ADD CONSTRAINT `favorite_articles_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `liked_articles`
--
ALTER TABLE `liked_articles`
  ADD CONSTRAINT `liked_articles_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`),
  ADD CONSTRAINT `liked_articles_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
